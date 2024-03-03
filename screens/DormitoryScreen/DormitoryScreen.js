import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { ModalReportProblem } from "../../components";

const DormitoryScreen = () => {
  const navigation = useNavigation();

  // State for checkbox toggle
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // Sample data for occupants
  const occupantsData = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];
  const handleProfileClick = (item) => {
    navigation.navigate("detail");
  };
  // Function to render each occupant item
  const renderOccupantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.occupantItem}
      onPress={() => handleProfileClick(item)}
    >
      <Image
        style={styles.profile}
        source={require("../../assets/icons/profile.jpg")}
      />
      <Text style={styles.occupantName}>{item.name}</Text>
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
      <View style={styles.contentContainer}>
        <View style={styles.dormInfoContainer}>
          <MaterialCommunityIcons name="bed" size={50} color="#FF5733" />
          <Text style={styles.dormTitle}>Dormitory A3</Text>
        </View>

        <Text style={styles.info}>Room: 101</Text>
        <Text style={styles.info}>
          Number of occupants: {occupantsData.length}
        </Text>
        <FlatList
          data={occupantsData}
          renderItem={renderOccupantItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.supportContainer}>
          <Text style={styles.supportText}>
            Materials Provided for Students:
          </Text>
          <View style={styles.supportItemsContainer}>
            <View style={styles.supportColumn}>
              <SupportItem label="Cup" />
              <SupportItem label="Pillow" />
              <SupportItem label="Table" />
            </View>
            <View style={styles.supportColumn}>
              <SupportItem label="Lamp" />
              <SupportItem label="Mattress" />
              <SupportItem label="Pillowcase" />
            </View>
          </View>
          <CustomButton
            title="Save"
            onPress={() => {}}
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
      <ModalReportProblem
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

// Component for each support item
const SupportItem = ({ label }) => {
  // State for checkbox toggle
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.supportItem}>
      <Text style={styles.supportLabel}>{label}</Text>
      <Checkbox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
    </View>
  );
};

// Custom Button Component
const CustomButton = ({ title, onPress, color, icon }) => (
  <TouchableOpacity
    style={[styles.buttonContainer, { backgroundColor: color }]}
    onPress={onPress}
  >
    {icon && icon}
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  headerContainer: {
    backgroundColor: "#4E74F9",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
  backButton: {
    marginRight: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 20,
    color: "#333333",
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666666",
    fontWeight: "bold",
  },
  occupantItem: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  occupantName: {
    fontSize: 18,
    color: "#333333",
  },
  supportContainer: {
    marginTop: 20,
  },
  supportText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  supportItemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  supportColumn: {
    flex: 1,
  },
  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  supportLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "#333333",
    width: 100,
  },
  reportContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  dormInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  dormTitle: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 20,
    color: "#333333",
    textAlign: "center",
  },
});

export default DormitoryScreen;
