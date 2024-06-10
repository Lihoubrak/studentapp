import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const ModalBuyTicketEvent = ({ modalVisible, setModalVisible, eventId }) => {
  const [ticketCount, setTicketCount] = useState("");
  const [loading, setLoading] = useState(false);
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
        numberOfTicket: parseFloat(ticketCount),
        typePayMoney: "Online",
      });
      setModalVisible(false);
      setTicketCount(""); // Clear the ticketCount state after successful submission
    } catch (error) {
      console.error("Error creating ticket event:", error);
      // Handle any errors here, such as displaying an error message to the user
    }
  };

  // Function to handle payment process
  const handlePayment = async () => {
    setLoading(true);
    try {
      // Create a payment intent for the ticket purchase
      const payment = await axiosInstanceWithAuth.post(
        "/payments/v21/buy-ticket",
        {
          eventId,
          numberOfTicket: parseFloat(ticketCount), // Ensure ticket count is a number
        }
      );

      // Initialize the payment sheet with the client secret received from the server
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: payment.data.clientSecret,
        merchantDisplayName: "studentApp",
      });

      // Check for initialization error
      if (initError) {
        console.error("Error initializing payment sheet:", initError);
        setLoading(false); // Stop loading state
        return;
      }

      // Present the payment sheet to the user
      const { error: paymentSheetError } = await presentPaymentSheet();

      // Check if there's an error presenting the payment sheet
      if (paymentSheetError) {
        // If the payment was canceled by the user
        if (paymentSheetError.code === "Canceled") {
          console.log("Payment was canceled by the user."); // Log the cancellation
        } else {
          // Log other payment sheet errors
          console.error("Error presenting payment sheet:", paymentSheetError);
        }
        setLoading(false); // Stop loading state
        return;
      }

      // If payment is successful, proceed to handle ticket purchase submission
      await handleSubmit();
    } catch (error) {
      console.error("Error handling payment:", error);
    } finally {
      setLoading(false);
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
              onPress={handlePayment}
              disabled={loading} // Disable button during loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Submit</Text>
              )}
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
