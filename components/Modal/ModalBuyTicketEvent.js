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
import { useAuthContext } from "../../contexts/AuthContext";

const ModalBuyTicketEvent = ({ modalVisible, setModalVisible, eventId }) => {
  const [ticketCount, setTicketCount] = useState("");
  const { axiosInstanceWithAuth, userIdFromToken } = useAuthContext();
  // Function to handle cancel button click
  const handleCancel = () => {
    setModalVisible(false);
    setTicketCount("");
  };
  // Function to handle submit button click
  const handleSubmit = async () => {
    try {
      const res = await axiosInstanceWithAuth.post("/ticketevents/v17/create", {
        userId: userIdFromToken,
        eventId,
        numberOfTicket: ticketCount,
      });
      setModalVisible(false);
      setTicketCount(""); // Clear the ticketCount state after successful submission
    } catch (error) {
      console.error("Error creating ticket event:", error);
      // Handle any errors here, such as displaying an error message to the user
    }
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
            placeholderTextColor="#666"
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
