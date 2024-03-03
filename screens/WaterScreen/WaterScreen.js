import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const WaterScreen = () => {
  const navigation = useNavigation();

  // Sample electrical information
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState("2024");

  const electricalInfo = {
    oldIndex: "500",
    newIndex: "600",
    totalConsumption: "100",
    support: "60",
    exceedLimit: "No",
    pricePerKwh: "$0.15",
    totalAmount: "$15.00",
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
        <Text style={styles.headerTitle}>Water</Text>
      </View>
      <View style={styles.roomInfoContainer}>
        <MaterialCommunityIcons name="water" size={40} color="#4682B4" />
        <Text style={styles.roomTitle}>ROOM 101</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="January" value="January" />
          <Picker.Item label="February" value="February" />
        </Picker>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="2022" value="2022" />
          <Picker.Item label="2023" value="2023" />
          <Picker.Item label="2024" value="2024" />
          {/* Add other years here */}
        </Picker>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="numeric" size={30} color="#FF5733" />
          <Text style={styles.label}>Old Index:</Text>
          <Text style={styles.value}>{electricalInfo.oldIndex}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="numeric" size={30} color="#3399FF" />
          <Text style={styles.label}>New Index:</Text>
          <Text style={styles.value}>{electricalInfo.newIndex}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="flash" size={30} color="#33FF57" />
          <Text style={styles.label}>Total Consumption:</Text>
          <Text style={styles.value}>{electricalInfo.totalConsumption}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="power-plug" size={30} color="#FFC300" />
          <Text style={styles.label}>Support:</Text>
          <Text style={styles.value}>{electricalInfo.support}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={30}
            color="#FF5733"
          />
          <Text style={styles.label}>Exceed Limit:</Text>
          <Text style={styles.value}>{electricalInfo.exceedLimit}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="currency-usd"
            size={30}
            color="#3399FF"
          />
          <Text style={styles.label}>Price per kWh:</Text>
          <Text style={styles.value}>{electricalInfo.pricePerKwh}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="cash" size={30} color="#33FF57" />
          <Text style={styles.label}>Total Amount:</Text>
          <Text style={styles.value}>{electricalInfo.totalAmount}</Text>
        </View>
      </View>
    </View>
  );
};

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
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 20,
  },
  picker: {
    width: "45%",
    backgroundColor: "#E5E5E5",
  },
  infoContainer: {
    flex: 1,
    padding: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 5,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 16,
    color: "#333333",
    width: 150,
  },
  value: {
    fontSize: 16,
    color: "#FFFFFF",
    backgroundColor: "#4E74F9",
    padding: 10,
    width: 100,
    borderRadius: 15,
    textAlign: "center",
  },
  roomInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  roomTitle: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 20,
    color: "#333333",
    textAlign: "center",
  },
});

export default WaterScreen;
