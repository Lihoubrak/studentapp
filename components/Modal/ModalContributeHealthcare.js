import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { useStripe } from "@stripe/stripe-react-native";

const ModalContributeHealthcare = ({
  isModalContributes,
  setIsModalContributes,
}) => {
  const { axiosInstanceWithAuth, userIdFromToken, axiosInstance } =
    useAuthContext();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [contributionAmount, setContributionAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setIsModalContributes(false);
  };

  const fetchPaymentSheetParams = async () => {
    const response = await axiosInstanceWithAuth.post(
      "/payments/v21/intentsforhealth",
      {
        amount: contributionAmount,
      }
    );
    const { paymentIntent } = response.data;

    return {
      paymentIntent,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "studentApp",
    });

    if (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(error.message);
    } else {
      Alert.alert("Success", "Your contribution was successful!");
      await submitContribution(); // Submit the contribution after successful payment
    }
    setLoading(false);
  };

  const submitContribution = async () => {
    try {
      await axiosInstance.post("/contributionhealthcares/v13/create", {
        date: new Date(),
        typePayMoney: "Online",
        payMoney: contributionAmount,
        userId: userIdFromToken,
      });
      setIsModalContributes(false);
    } catch (error) {
      console.error("Submission error: ", error);
      Alert.alert("Error", "There was an error submitting your contribution.");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await initializePaymentSheet();
      await openPaymentSheet();
    } catch (error) {
      console.error("Payment error: ", error);
      setLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalContributes}
      onRequestClose={() => {
        setIsModalContributes(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Contribute Support</Text>
          <TextInput
            style={styles.input}
            placeholder="Contribution Amount"
            keyboardType="numeric"
            value={contributionAmount}
            onChangeText={setContributionAmount}
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

export default ModalContributeHealthcare;
