import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useAuthContext } from "../../contexts/AuthContext";

const ModalCreatePassport = ({ isVisible, onClose, fetchData, passportId }) => {
  const [formData, setFormData] = useState({
    passportNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    gender: "",
    type: "",
    code: "",
    nationality: "",
    placeOfBirth: "",
    placeOfIssue: "",
    dateOfExpiry: null,
    dateOfIssue: null,
    image: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState(null);
  const [chosenDate, setChosenDate] = useState(new Date());

  const { axiosInstanceWithAuth } = useAuthContext();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChooseImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission required",
        "Permission to access camera roll is required!"
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    setFormData({
      ...formData,
      image: pickerResult.assets[0].uri,
    });
  };

  const handleDateFieldClick = (fieldName) => {
    setActiveDateField(fieldName);
    setShowDatePicker(true); // Ensure that this line is executed
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    setChosenDate(date);
    if (activeDateField) {
      setFormData({
        ...formData,
        [activeDateField]: date,
      });
    }
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("passportNumber", formData.passportNumber);
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append(
        "dateofbirth",
        formData.dateOfBirth ? formData.dateOfBirth.toISOString() : ""
      );
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("code", formData.code);
      formDataToSend.append("nationality", formData.nationality);
      formDataToSend.append("placeofbirth", formData.placeOfBirth);
      formDataToSend.append("placeofissue", formData.placeOfIssue);
      formDataToSend.append(
        "dateofexpiry",
        formData.dateOfExpiry ? formData.dateOfExpiry.toISOString() : ""
      );
      formDataToSend.append(
        "dateofissue",
        formData.dateOfIssue ? formData.dateOfIssue.toISOString() : ""
      );

      if (formData.image) {
        const filename = formData.image.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image";

        formDataToSend.append("image", {
          uri: formData.image,
          name: filename,
          type,
        });
      }
      const response = await axiosInstanceWithAuth.put(
        `http://192.168.1.4:3000/passports/v6/edit/${passportId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onClose();
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatDate = (date) => {
    const dateString = date.toDateString();
    const [_, month, day, year] = dateString.split(" ");
    return `${day} ${month} ${year}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Create Passport</Text>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {Object.entries(formData)
              .filter(([key]) => key !== "image")
              .map(([key, value]) => (
                <View key={key}>
                  {key.includes("date") ? (
                    <TouchableOpacity
                      onPress={() => handleDateFieldClick(key)}
                      style={styles.dateInputContainer}
                    >
                      <TextInput
                        style={[styles.input, { color: "black" }]}
                        placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                        editable={false}
                        value={value ? formatDate(value) : ""}
                        placeholderTextColor="#666"
                      />
                      {activeDateField === key && showDatePicker && (
                        <RNDateTimePicker
                          value={chosenDate}
                          mode="date"
                          display="spinner"
                          onChange={handleDateChange}
                        />
                      )}
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <TextInput
                        style={styles.input}
                        placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                        value={value}
                        onChangeText={(text) => handleChange(key, text)}
                      />
                    </View>
                  )}
                </View>
              ))}
            <TouchableOpacity onPress={handleChooseImage} style={styles.button}>
              <Text style={styles.buttonText}>Choose Image</Text>
            </TouchableOpacity>
            {formData.image && (
              <Image source={{ uri: formData.image }} style={styles.image} />
            )}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCreatePassport;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginHorizontal: 5,
    height: 500,
    justifyContent: "space-between",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  scrollView: {
    flexGrow: 1,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dateInputContainer: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  closeButton: {
    backgroundColor: "#E74C3C",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
});
