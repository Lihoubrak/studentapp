import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const PassportScreen = () => {
  const navigation = useNavigation();
  // Sample passport information
  const passportInfo = {
    fullName: "John Doe",
    dateOfBirth: "January 1, 1990",
    sex: "Male",
    type: "Regular",
    code: "123456",
    nationality: "Country",
    placeOfBirth: "City, Country",
    placeOfIssue: "City, Country",
    dateOfExpiry: "December 31, 2025",
    dateOfIssue: "January 1, 2020",
    passportNumber: "ABC123456",
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
        <Text style={styles.headerTitle}>Passport</Text>
      </View>
      <View style={styles.passportInfoContainer}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="account" size={30} color="#4e74f9" />
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{passportInfo.fullName}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="calendar" size={30} color="#4e74f9" />
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{passportInfo.dateOfBirth}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="gender-male-female"
            size={30}
            color="#4e74f9"
          />
          <Text style={styles.label}>Sex:</Text>
          <Text>{passportInfo.sex}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="card-text" size={30} color="#4e74f9" />
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{passportInfo.type}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="card-bulleted"
            size={30}
            color="#4e74f9"
          />
          <Text style={styles.label}>Code:</Text>
          <Text style={styles.value}>{passportInfo.code}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="earth" size={30} color="#4e74f9" />
          <Text style={styles.label}>Nationality:</Text>
          <Text style={styles.value}>{passportInfo.nationality}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="map-marker" size={30} color="#4e74f9" />
          <Text style={styles.label}>Place of Birth:</Text>
          <Text style={styles.value}>{passportInfo.placeOfBirth}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="map-marker" size={30} color="#4e74f9" />
          <Text style={styles.label}>Place of Issue:</Text>
          <Text style={styles.value}>{passportInfo.placeOfIssue}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="calendar-clock"
            size={30}
            color="#4e74f9"
          />
          <Text style={styles.label}>Date of Expiry:</Text>
          <Text style={styles.value}>{passportInfo.dateOfExpiry}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="calendar" size={30} color="#4e74f9" />
          <Text style={styles.label}>Date of Issue:</Text>
          <Text style={styles.value}>{passportInfo.dateOfIssue}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="passport" size={30} color="#4e74f9" />
          <Text style={styles.label}>Passport Number:</Text>
          <Text style={styles.value}>{passportInfo.passportNumber}</Text>
        </View>
      </View>
    </View>
  );
};

export default PassportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    backgroundColor: "#4e74f9",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  passportInfoContainer: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
});
