import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const PassportScreen = () => {
  const navigation = useNavigation();
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
    isApproved: false, // Thêm trạng thái phê duyệt
  };

  const handleEdit = () => {
    // Kiểm tra nếu thông tin đã được phê duyệt
    if (passportInfo.isApproved) {
      // Thực hiện chỉnh sửa
      // Redirect hoặc hiển thị màn hình chỉnh sửa
    } else {
      // Hiển thị thông báo cho người dùng
      alert("Your changes need to be approved by admin first.");
    }
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

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Image
          source={require("../../assets/icons/khmernewyear.jpg")}
          style={styles.passportImage}
        />
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="passport" size={25} color="#4e74f9" />
            <Text style={styles.label}>Passport Number:</Text>
            <Text style={styles.value}>{passportInfo.passportNumber}</Text>
          </View>
        </View>
      </View>

      <View style={styles.passportInfoContainer}>
        <View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="account" size={25} color="#4e74f9" />
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.value}>{passportInfo.fullName}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="calendar" size={25} color="#4e74f9" />
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.value}>{passportInfo.dateOfBirth}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="gender-male-female"
              size={25}
              color="#4e74f9"
            />
            <Text style={styles.label}>Sex:</Text>
            <Text>{passportInfo.sex}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="card-text"
              size={25}
              color="#4e74f9"
            />
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{passportInfo.type}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="card-bulleted"
              size={25}
              color="#4e74f9"
            />
            <Text style={styles.label}>Code:</Text>
            <Text style={styles.value}>{passportInfo.code}</Text>
          </View>
        </View>

        <View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="earth" size={25} color="#4e74f9" />
            <Text style={styles.label}>Nationality:</Text>
            <Text style={styles.value}>{passportInfo.nationality}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="map-marker"
              size={25}
              color="#4e74f9"
            />
            <Text style={styles.label}>Place of Birth:</Text>
            <Text style={styles.value}>{passportInfo.placeOfBirth}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="map-marker"
              size={25}
              color="#4e74f9"
            />
            <Text style={styles.label}>Place of Issue:</Text>
            <Text style={styles.value}>{passportInfo.placeOfIssue}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={25}
              color="#4e74f9"
            />
            <Text style={styles.label}>Date of Expiry:</Text>
            <Text style={styles.value}>{passportInfo.dateOfExpiry}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="calendar" size={25} color="#4e74f9" />
            <Text style={styles.label}>Date of Issue:</Text>
            <Text style={styles.value}>{passportInfo.dateOfIssue}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleEdit}>
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons name="pencil" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Edit</Text>
          </View>
        </TouchableOpacity>
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
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
  },
  passportInfoContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    color: "#333333",
  },
  value: {
    fontSize: 16,
    color: "#555555",
  },
  passportImage: {
    width: 350,
    height: 200,
    resizeMode: "contain",
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
});
