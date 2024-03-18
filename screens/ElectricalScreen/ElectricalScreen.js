import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";

const ElectricalScreen = () => {
  const navigation = useNavigation();
  const { auth } = useAuthContext();
  // Sample electrical information
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [electrical, setElectrical] = useState(null);
  useEffect(() => {
    const fetchElectrical = async () => {
      try {
        const res = await axios.get(
          `http://192.168.1.4:3000/electricals/v7/user/all?year=${selectedYear}&month=${selectedMonth}`,
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        );
        setElectrical(res.data);
      } catch (error) {}
    };

    if (auth) {
      fetchElectrical();
    }
  }, [auth, selectedYear, selectedMonth]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Electrical</Text>
      </View>
      <View style={styles.roomInfoContainer}>
        <MaterialCommunityIcons name="flash" size={40} color="#FFA500" />
        <Text style={styles.roomTitle}>ROOM {electrical?.Room.roomNumber}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
          style={styles.picker}
        >
          <Picker.Item
            label={new Date().getFullYear()}
            value={new Date().getFullYear()}
          />
          <Picker.Item label="2023" value="2023" />
          <Picker.Item label="2022" value="2022" />
        </Picker>

        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
          style={styles.picker}
        >
          <Picker.Item
            label={new Date().toLocaleDateString("en-US", { month: "long" })}
            value={new Date().getMonth() + 1}
          />
          <Picker.Item label="January" value="1" />
          <Picker.Item label="February" value="2" />
          <Picker.Item label="March" value="3" />
          <Picker.Item label="April" value="4" />
          <Picker.Item label="May" value="5" />
          <Picker.Item label="June" value="6" />
          <Picker.Item label="July" value="7" />
          <Picker.Item label="August" value="8" />
          <Picker.Item label="September" value="9" />
          <Picker.Item label="October" value="10" />
          <Picker.Item label="November" value="11" />
          <Picker.Item label="December" value="12" />
        </Picker>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="numeric" size={30} color="#FF5733" />
          <Text style={styles.label}>Old Index:</Text>
          <Text style={styles.value}>{electrical?.oldIndex}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="numeric" size={30} color="#3399FF" />
          <Text style={styles.label}>New Index:</Text>
          <Text style={styles.value}>{electrical?.newIndex}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="flash" size={30} color="#33FF57" />
          <Text style={styles.label}>Total Consumption:</Text>
          <Text style={styles.value}>{electrical?.totalConsumption}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="power-plug" size={30} color="#FFC300" />
          <Text style={styles.label}>Support:</Text>
          <Text style={styles.value}>{electrical?.support}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={30}
            color="#FF5733"
          />
          <Text style={styles.label}>Exceed Limit:</Text>
          <Text style={styles.value}>{electrical?.exceedLimit}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="currency-usd"
            size={30}
            color="#3399FF"
          />
          <Text style={styles.label}>Price per kWh:</Text>
          <Text style={styles.value}>{electrical?.pricePerKwh}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="cash" size={30} color="#33FF57" />
          <Text style={styles.label}>Total Amount:</Text>
          <Text style={styles.value}>{electrical?.totalAmount}</Text>
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

export default ElectricalScreen;
