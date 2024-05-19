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
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuthContext } from "../../contexts/AuthContext";
import { Platform } from "react-native";

const ModalEditProfile = ({ isModalEdit, setIsModalEdit }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const { axiosInstanceWithAuth } = useAuthContext();
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
    setPhoneNumber("");
    setEmail("");
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axiosInstanceWithAuth.put("/users/v1/edit", {
        avatar: profileImage,
        phoneNumber,
        email,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully");
        handleCloseModal();
      } else {
        Alert.alert("Error", "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Internal server error");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
                placeholderTextColor="#666"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                keyboardType="email-address"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
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
    </KeyboardAvoidingView>
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
