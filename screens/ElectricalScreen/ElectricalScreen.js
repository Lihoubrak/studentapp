import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import { ModalPickerMonth, ModalPickerYear } from "../../components";

const ElectricalScreen = () => {
  const navigation = useNavigation();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [electrical, setElectrical] = useState(null);
  const [loading, setLoading] = useState(false);
  const { axiosInstanceWithAuth } = useAuthContext();
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const fetchElectrical = async (year, month) => {
    setLoading(true);
    try {
      const res = await axiosInstanceWithAuth.get(
        `/electricals/v7/user/all?year=${selectedYear}&month=${selectedMonth}`
      );
      setElectrical(res.data);
    } catch (error) {
      setElectrical([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchElectrical(currentYear, currentMonth);
  }, []);
  useEffect(() => {
    if (
      selectedMonth &&
      selectedYear &&
      currentMonth !== selectedMonth &&
      currentYear !== selectedYear
    ) {
      fetchElectrical(selectedYear, selectedMonth);
      return;
    }
  }, [selectedYear, selectedMonth]);
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4E74F9" />
        </View>
      ) : (
        <>
          <View style={styles.roomInfoContainer}>
            <MaterialCommunityIcons name="flash" size={40} color="#FFA500" />
            <Text style={styles.roomTitle}>ROOM {electrical?.roomNumber}</Text>
          </View>
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={() => setShowYearPicker(true)}
              style={styles.filterButton}
            >
              <MaterialCommunityIcons name="filter" size={20} color="#007AFF" />
              <Text
                style={[
                  styles.filterButtonText,
                  { color: "#666", fontSize: 18 },
                ]}
              >
                {selectedYear ? `Year: ${selectedYear}` : "Select Year"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowMonthPicker(true)}
              style={styles.filterButton}
            >
              <MaterialCommunityIcons name="filter" size={20} color="#007AFF" />
              <Text
                style={[
                  styles.filterButtonText,
                  { color: "#666", fontSize: 18 },
                ]}
              >
                {selectedMonth ? `Month: ${selectedMonth}` : "Select Month"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="numeric"
                size={30}
                color="#FF5733"
              />
              <Text style={styles.label}>Old Index:</Text>
              <Text style={styles.value}>{electrical?.oldIndex}</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="numeric"
                size={30}
                color="#3399FF"
              />
              <Text style={styles.label}>New Index:</Text>
              <Text style={styles.value}>{electrical?.newIndex}</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="flash" size={30} color="#33FF57" />
              <Text style={styles.label}>Total Consumption:</Text>
              <Text style={styles.value}>{electrical?.totalConsumption}</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="power-plug"
                size={30}
                color="#FFC300"
              />
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
        </>
      )}
      <ModalPickerYear
        showPicker={showYearPicker}
        setShowPicker={setShowYearPicker}
        selectedYear={selectedYear}
        setSelectedYear={(year) => {
          setSelectedYear(year);
          setShowYearPicker(false);
        }}
      />
      <ModalPickerMonth
        showPicker={showMonthPicker}
        setShowPicker={setShowMonthPicker}
        selectedMonth={selectedMonth}
        setSelectedMonth={(month) => {
          setSelectedMonth(month);
          setShowMonthPicker(false);
        }}
      />
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
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E5E5E5",
    borderRadius: 5,
  },
  filterButtonText: {
    marginLeft: 5,
    color: "#007AFF",
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ElectricalScreen;
