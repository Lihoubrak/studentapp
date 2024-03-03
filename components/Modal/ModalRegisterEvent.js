import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const ModalRegisterEvent = ({ modalVisible, setModalVisible }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Function to handle cancel button click
  const handleCancel = () => {
    // Close the modal
    setModalVisible(false);
    setFullName("");
    setEmail("");
  };

  // Function to handle submit button click
  const handleSubmit = () => {
    // Add your logic here for handling event registration
    // For example, you can send the user's details to a server
    // and handle the registration process
    // After handling the registration, you can close the modal
    setModalVisible(false);
    setFullName("");
    setEmail("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Register for Event</Text>
          <Text style={styles.infoText}>
            To participate in the event, a payment of $20 is required. Payment
            can be made online via credit card or offline by contacting the
            event organizers. For offline payments, please reach out to our team
            at event.organizers@example.com.
          </Text>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
    width: windowWidth * 0.8,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "80%",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#999999",
  },
  submitButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default ModalRegisterEvent;
