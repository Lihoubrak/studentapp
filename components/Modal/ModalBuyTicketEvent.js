import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const ModalBuyTicketEvent = ({ modalVisible, setModalVisible }) => {
  const [ticketCount, setTicketCount] = useState("");

  // Function to handle cancel button click
  const handleCancel = () => {
    // Close the modal
    setModalVisible(false);
    setTicketCount("");
  };

  // Function to handle submit button click
  const handleSubmit = () => {
    // Add your logic here for handling ticket purchase
    // For example, you can send the number of tickets to a server
    // and handle the purchase process
    // After handling the purchase, you can close the modal
    setModalVisible(false);
    setTicketCount("");
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
          <Text style={styles.modalText}>Buy Tickets</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of tickets"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            onChangeText={(text) => setTicketCount(text)}
            value={ticketCount}
          />

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
});

export default ModalBuyTicketEvent;
