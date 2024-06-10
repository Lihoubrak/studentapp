import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { useStripe } from "@stripe/stripe-react-native";

const ModalRegisterEvent = ({ modalVisible, setModalVisible, eventId }) => {
  const { axiosInstance, axiosInstanceWithAuth, userIdFromToken } =
    useAuthContext();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/participantevents/v11/create", {
        userId: userIdFromToken,
        eventId,
        typePayMoney: "Online",
      });
      setModalVisible(false);
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  const checkUserRegistration = async () => {
    try {
      const registrationCheck = await axiosInstanceWithAuth.post(
        "/participantevents/v11/check",
        { eventId }
      );

      return registrationCheck.data.alreadyRegistered;
    } catch (error) {
      Alert.alert("Registration", "You are already registered for this event.");
      return true; // Assuming user is already registered if an error occurs
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Check if the user is already registered for the event
      const alreadyRegistered = await checkUserRegistration();
      if (!alreadyRegistered) {
        // If the user is not registered, proceed with the payment process
        const payment = await axiosInstanceWithAuth.post(
          "/payments/v21/intents",
          {
            eventId,
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

        // If payment is successful, proceed to handle registration
        await handleSubmit();
      }
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
              onPress={handlePayment}
              disabled={loading}
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
