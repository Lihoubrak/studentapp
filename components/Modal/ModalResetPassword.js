import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { useAuthContext } from "../../contexts/AuthContext";

const ModalResetPassword = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(0); // 0: Email, 1: OTP, 2: New Password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { axiosInstanceWithAuth } = useAuthContext();

  const handleSubmitEmail = async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);
    try {
      const res = await axiosInstanceWithAuth.post(
        "/users/v1/send-verification-code",
        { userEmailAddress: email }
      );
      if (res.status === 200) {
        setStep(1);
        setError("");
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    }
    setLoading(false);
  };

  const handleSubmitOtp = async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);
    try {
      const res = await axiosInstanceWithAuth.post("/users/v1/verify-code", {
        code: otpCode,
      });
      if (res.status === 200) {
        setStep(2);
        setError("");
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    }
    setLoading(false);
  };

  const handleSubmitNewPassword = async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);
    try {
      const res = await axiosInstanceWithAuth.put(
        "/users/v1/update-password-by-user",
        {
          newPassword: newPassword,
        }
      );

      if (res.status === 200) {
        closeModal();
        setError("");
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
      console.log(error);
    }
    setLoading(false);
  };

  const handleResendOTP = async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);
    try {
      const res = await axiosInstanceWithAuth.post("/users/v1/reset-otp", {});
      if (res.status === 200) {
        setError("");
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    }
    setLoading(false);
  };

  const renderCancelButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          closeModal();
          setStep(0);
          setError("");
          setEmail("");
        }}
        style={styles.cancelButton}
      >
        <MaterialCommunityIcons name="close-circle" size={24} color="red" />
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={isOpen} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {renderCancelButton()}
          <Text style={styles.modalTitle}>Reset Password</Text>
          {step === 0 && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmitEmail}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Send Verification Code</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
          {step === 1 && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP code"
                placeholderTextColor="#666"
                value={otpCode}
                onChangeText={(text) => setOtpCode(text)}
              />
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmitOtp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Verify OTP</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleResendOTP}
                style={styles.resendButton}
                disabled={loading}
              >
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          )}
          {step === 2 && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#666"
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmitNewPassword}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Reset Password</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  cancelButton: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#007bff90",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  resendButton: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  resendButtonText: {
    color: "#007bff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ModalResetPassword;
