import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuthContext } from "../../contexts/AuthContext";

const ModalRegisterHealthcare = ({
  isModalRegisterhealthcare,
  setIsModalRegisterhealthcare,
}) => {
  const [formData, setFormData] = useState({
    cost: "",
    hospital: "",
    typeOfDisease: "",
    profileImages: [],
  });

  const { axiosInstance, userIdFromToken } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      const images = result.assets.map((asset) => ({
        uri: asset.uri,
        name: `image_${Date.now()}.jpg`,
        type: "image/jpg",
      }));
      setFormData({ ...formData, profileImages: images });
    }
  };

  const handleCloseModal = () => {
    setIsModalRegisterhealthcare(false);
    setFormData({
      cost: "",
      hospital: "",
      typeOfDisease: "",
      profileImages: [],
    });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("cost", formData.cost);
      formDataToSend.append("hospital", formData.hospital);
      formDataToSend.append("typeofDisease", formData.typeOfDisease);
      formDataToSend.append("userId", userIdFromToken);
      formData.profileImages.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await axiosInstance.post(
        "/heathcares/v12/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsModalRegisterhealthcare(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Error",
        "Failed to create healthcare event. Please try again later."
      );
    }
  };

  return (
    <Modal
      visible={isModalRegisterhealthcare}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Cost:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cost"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={formData.cost}
              onChangeText={(text) => setFormData({ ...formData, cost: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Hospital:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter hospital"
              placeholderTextColor="#666"
              value={formData.hospital}
              onChangeText={(text) =>
                setFormData({ ...formData, hospital: text })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Type of Disease:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter type of disease"
              placeholderTextColor="#666"
              value={formData.typeOfDisease}
              onChangeText={(text) =>
                setFormData({ ...formData, typeOfDisease: text })
              }
            />
          </View>
          <TouchableOpacity onPress={handleImageUpload}>
            <Text style={styles.selectImageText}>
              {formData.profileImages.length > 0
                ? "Images Uploaded"
                : "Select Images"}
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleCloseModal}
              disabled={loading}
              style={styles.closeButton}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSaveChanges}
              disabled={loading}
              style={styles.saveButton}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    elevation: 5,
  },
  inputContainer: {
    marginVertical: 5,
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    fontSize: 14,
  },
  selectImageText: {
    fontSize: 12,
    color: "#007bff",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#999999",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default ModalRegisterHealthcare;
