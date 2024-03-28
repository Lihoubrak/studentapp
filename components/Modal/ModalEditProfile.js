import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ModalEditProfile = ({ isModalEdit, setIsModalEdit }) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleCloseModal = () => {
    setIsModalEdit(false);
    setProfileImage(null);
  };

  const handleSaveChanges = () => {
    // Add functionality to save changes
  };

  return (
    <Modal visible={isModalEdit} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Text style={styles.noImageText}>No Image Selected</Text>
            )}
            <Button title="Upload Image" onPress={handleImageUpload} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSaveChanges}>
              <Text style={styles.buttonText}>Save</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black background
  },
  modalContent: {
    backgroundColor: "#ffffff", // white background for modal content
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    elevation: 5, // add elevation for shadow on Android
  },
  inputContainer: {
    marginVertical: 10,
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333", // dark gray color
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc", // light gray border color
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  noImageText: {
    marginBottom: 10,
    fontSize: 16,
    color: "#666666", // medium gray color
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20, // add some space between inputs and buttons
  },
  buttonText: {
    color: "#ffffff", // white color for text
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#007bff", // blue button background color
  },
});

export default ModalEditProfile;
