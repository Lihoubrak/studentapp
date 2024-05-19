import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuthContext } from "../../contexts/AuthContext";
import { ModalResetPassword } from "../../components";

const SettingScreen = () => {
  const navigation = useNavigation();
  const { setAuth } = useAuthContext();
  const [resetPassword, setResetPassword] = useState(false);
  const handleLogout = () => {
    setAuth("");
  };

  const handleChangePassword = () => {
    setResetPassword(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/icons/logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.aboutText}>
          Welcome to StudentApp, the essential companion for Cambodian students
          studying in Vietnam. Whether you're navigating dormitories, managing
          utilities like electricity and water, or registering for campus events
          and clubs, StudentApp has you covered. As a Cambodian student myself,
          I understand the unique challenges of studying abroad. That's why I've
          developed StudentApp to streamline your experience, providing
          everything from dormitory information to event registration, all in
          one convenient place.
        </Text>
      </View>
      <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
        <MaterialCommunityIcons name="lock-reset" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <MaterialCommunityIcons name="logout" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.versionText}>Version 1.0</Text>
      </View>
      <ModalResetPassword
        isOpen={resetPassword}
        closeModal={() => setResetPassword(false)}
      />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4e74f9",
  },
  headerContainer: {
    backgroundColor: "#4e74f9",
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4e74f9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 10,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#FFFFFF",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  versionText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});
