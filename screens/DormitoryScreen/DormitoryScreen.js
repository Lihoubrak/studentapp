import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { useAuthContext } from "../../contexts/AuthContext";
import { ModalReportProblem } from "../../components";

const DormitoryScreen = () => {
  const navigation = useNavigation();
  const { axiosInstanceWithAuth, userIdFromToken } = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [occupants, setOccupants] = useState([]);

  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState({
    Cup: false,
    Lamp: false,
    Pillow: false,
    Table: false,
    Pillowcase: false,
    Mattress: false,
  });

  useEffect(() => {
    const fetchOccupants = async () => {
      try {
        const res = await axiosInstanceWithAuth.get("/rooms/v3/member");
        setOccupants(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    const fetchMaterial = async () => {
      try {
        const response = await axiosInstanceWithAuth.get(
          `/rooms/v3/usermaterials/${userIdFromToken}`
        );
        const materialsData = response.data;
        setMaterials(materialsData);
      } catch (error) {}
    };
    fetchMaterial();
    fetchOccupants();
  }, []);

  const navigateToProfile = (userId) => {
    navigation.navigate("detail", { userId });
  };

  const handleSaveMaterials = async () => {
    try {
      await axiosInstanceWithAuth.put(`/rooms/v3/material`, {
        materials,
      });
      Alert.alert("Success", "Materials saved successfully.");
    } catch (error) {
      Alert.alert("Error", "Failed to save materials. Please try again later.");
      console.log(error);
    }
  };

  const handleToggleMaterial = (material) => {
    setMaterials((prevMaterials) => ({
      ...prevMaterials,
      [material]: !prevMaterials[material],
    }));
  };

  const renderOccupantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.occupantItem}
      onPress={() => navigateToProfile(item.id)}
    >
      <Image
        style={styles.profile}
        source={{ uri: item.avatar.replace("localhost", "192.168.1.4") }}
      />
      <Text
        style={styles.occupantName}
      >{`${item.firstName} ${item.lastName}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dormitory</Text>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.dormInfoContainer}>
            <MaterialCommunityIcons name="bed" size={50} color="#FF5733" />
            <Text style={styles.dormTitle}>
              {occupants[0]?.Room?.Dormitory.dormName}
            </Text>
          </View>

          <Text style={styles.info}>
            Room: {occupants[0]?.Room?.roomNumber}
          </Text>
          <Text style={styles.info}>
            Number of occupants: {occupants[0]?.Room?.numberOfStudents}
          </Text>
          <FlatList
            data={occupants}
            renderItem={renderOccupantItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.supportContainer}>
            <Text style={styles.supportText}>
              Materials Provided for Students:
            </Text>
            <View style={styles.supportItemsContainer}>
              <View style={styles.supportColumn}>
                <SupportItem
                  label="Cup"
                  checked={materials.Cup}
                  onPress={() => handleToggleMaterial("Cup")}
                />
                <SupportItem
                  label="Pillow"
                  checked={materials.Pillow}
                  onPress={() => handleToggleMaterial("Pillow")}
                />
                <SupportItem
                  label="Table"
                  checked={materials.Table}
                  onPress={() => handleToggleMaterial("Table")}
                />
              </View>
              <View style={styles.supportColumn}>
                <SupportItem
                  label="Lamp"
                  checked={materials.Lamp}
                  onPress={() => handleToggleMaterial("Lamp")}
                />
                <SupportItem
                  label="Mattress"
                  checked={materials.Mattress}
                  onPress={() => handleToggleMaterial("Mattress")}
                />
                <SupportItem
                  label="Pillowcase"
                  checked={materials.Pillowcase}
                  onPress={() => handleToggleMaterial("Pillowcase")}
                />
              </View>
            </View>
            <CustomButton
              title="Save"
              onPress={handleSaveMaterials}
              color={"#2E8B57"}
              icon={
                <MaterialCommunityIcons
                  name="content-save"
                  size={20}
                  color="white"
                />
              }
            />
            <CustomButton
              title="Report"
              onPress={() => setModalVisible(true)}
              color={"#4682B4"}
              icon={
                <MaterialCommunityIcons
                  name="alert-circle-outline"
                  size={20}
                  color="white"
                />
              }
            />
          </View>
        </View>
      )}
      <ModalReportProblem
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        roomId={occupants[0]?.Room?.id}
      />
    </View>
  );
};

const SupportItem = ({ label, checked, onPress }) => {
  return (
    <View style={styles.supportItem}>
      <Text style={styles.supportLabel}>{label}</Text>
      <Checkbox disabled={false} value={checked} onValueChange={onPress} />
    </View>
  );
};

const CustomButton = ({ title, onPress, color, icon }) => (
  <TouchableOpacity
    style={[styles.buttonContainer, { backgroundColor: color }]}
    onPress={onPress}
  >
    {icon && icon}
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  headerContainer: {
    backgroundColor: "#4e74f9",
    paddingTop: windowHeight * 0.05, // Adjust padding based on screen height
    paddingHorizontal: 20,
    paddingBottom: windowHeight * 0.03,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: windowHeight * 0.025, // Adjust font size based on screen height
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: windowHeight * 0.05,
  },
  contentContainer: {
    paddingHorizontal: windowWidth * 0.05,
    flex: 1,
    paddingBottom: windowHeight * 0.03,
  },
  dormInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: windowWidth * 0.02,
    marginBottom: windowHeight * 0.03,
  },
  dormTitle: {
    fontSize: windowHeight * 0.03,
    fontWeight: "bold",
    paddingVertical: windowHeight * 0.02,
    color: "#333333",
    textAlign: "center",
  },
  info: {
    fontSize: windowHeight * 0.02,
    marginBottom: windowHeight * 0.015,
    color: "#666666",
    fontWeight: "bold",
  },
  occupantItem: {
    paddingVertical: windowHeight * 0.0015,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  profile: {
    height: windowHeight * 0.1,
    width: windowHeight * 0.1,
    borderRadius: windowHeight * 0.05,
    marginRight: windowWidth * 0.02,
  },
  occupantName: {
    fontSize: windowHeight * 0.025,
    color: "#333333",
  },
  supportContainer: {
    marginTop: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.02,
  },
  supportText: {
    fontSize: windowHeight * 0.025,
    fontWeight: "bold",
    marginBottom: windowHeight * 0.015,
    color: "#333333",
  },
  supportItemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: windowHeight * 0.015,
  },
  supportColumn: {
    flex: 1,
  },
  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: windowHeight * 0.01,
  },
  supportLabel: {
    fontSize: windowHeight * 0.02,
    marginRight: windowWidth * 0.02,
    color: "#333333",
    width: windowWidth * 0.3,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: windowHeight * 0.02,
    borderRadius: windowHeight * 0.01,
    marginBottom: windowHeight * 0.015,
  },
  buttonText: {
    color: "white",
    fontSize: windowHeight * 0.02,
    marginLeft: windowWidth * 0.02,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default DormitoryScreen;
