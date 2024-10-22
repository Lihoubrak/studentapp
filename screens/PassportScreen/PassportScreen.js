import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { ModalCreatePassport, ModalEditPassport } from "../../components";

const PassportScreen = () => {
  const navigation = useNavigation();
  const { axiosInstanceWithAuth } = useAuthContext();
  const [passportInfo, setPassportInfo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEnterModal, setShowEnterModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstanceWithAuth.get(`/passports/v6/all`);
      setPassportInfo(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleEnter = () => {
    if (passportInfo) {
      return (
        <TouchableOpacity onPress={handleEdit}>
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons name="pencil" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Edit</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => setShowEnterModal(true)}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Enter</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const handleEdit = async () => {
    if (passportInfo.isApprove) {
      setShowEditModal(true);
    } else {
      Alert.alert(
        "Confirmation",
        "Your changes are pending approval by admin. Please wait.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              try {
                const res = await axiosInstanceWithAuth.put(
                  `/passports/v6/edit/${passportInfo?.id}`,
                  {}
                );
              } catch (error) {}
            },
          },
        ]
      );
    }
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4e74f9" />
      </View>
    );
  }
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

      <View style={styles.passportImageContainer}>
        <Image
          source={{
            uri: passportInfo?.image.replace("localhost", "192.168.122.130"),
          }}
          style={styles.passportImage}
          alt="Passport Image"
        />
      </View>

      <View style={styles.passportInfoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Passport Number:</Text>
          <Text style={styles.value}>{passportInfo?.passportNumber}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>
            {passportInfo?.firstName} {passportInfo?.lastName}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>
            {passportInfo?.dateofbirth &&
              new Date(
                passportInfo?.dateofbirth._seconds * 1000 +
                  passportInfo?.dateofbirth._nanoseconds / 1000000
              ).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Sex:</Text>
          <Text style={styles.value}>{passportInfo?.gender}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{passportInfo?.type}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Code:</Text>
          <Text style={styles.value}>{passportInfo?.code}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Nationality:</Text>
          <Text style={styles.value}>{passportInfo?.nationality}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Place of Birth:</Text>
          <Text style={styles.value}>{passportInfo?.placeofbirth}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Place of Issue:</Text>
          <Text style={styles.value}>{passportInfo?.placeofissue}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Date of Expiry:</Text>
          <Text style={styles.value}>
            {passportInfo?.dateofexpiry &&
              new Date(
                passportInfo?.dateofexpiry._seconds * 1000 +
                  passportInfo?.dateofexpiry._nanoseconds / 1000000
              ).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Date of Issue:</Text>
          <Text style={styles.value}>
            {passportInfo?.dateofissue &&
              new Date(
                passportInfo?.dateofissue._seconds * 1000 +
                  passportInfo?.dateofissue._nanoseconds / 1000000
              ).toLocaleDateString()}
          </Text>
        </View>
        {handleEnter()}
      </View>

      {passportInfo && passportInfo.isApprove && (
        <ModalEditPassport
          isVisible={showEditModal}
          onClose={() => setShowEditModal(false)}
          passportId={passportInfo.id}
          fetchData={fetchData}
        />
      )}

      <ModalCreatePassport
        isVisible={showEnterModal}
        onClose={() => setShowEnterModal(false)}
        fetchData={fetchData}
      />
    </View>
  );
};

export default PassportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  passportImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  passportImage: {
    width: 350,
    height: 200,
    resizeMode: "contain",
  },
  passportInfoContainer: {
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
    marginRight: 10,
    fontSize: 16,
    color: "#333333",
  },
  value: {
    fontSize: 16,
    color: "#555555",
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
