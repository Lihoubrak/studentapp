import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  ModalContributeHealthcare,
  ModalRegisterHealthcare,
} from "../../components";

export default function HealthcareScreen() {
  const navigation = useNavigation();
  const { axiosInstanceWithAuth } = useAuthContext();
  const [numberOfVisits, setNumberOfVisits] = useState(0);
  const [yearlyData, setYearlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalContributes, setIsModalContributes] = useState(false);
  const [isModalRegisterhealthcare, setIsModalRegisterhealthcare] =
    useState(false);

  useEffect(() => {
    fetchHealthcareData();
    fetchNumberOfVisits();
  }, []);

  const fetchHealthcareData = async () => {
    try {
      const response = await axiosInstanceWithAuth.get(
        `/heathcares/v12/healthcaredataforeachfiveyears?startYear=2024`
      );
      setYearlyData(response.data);
    } catch (error) {
      console.error("Error fetching healthcare data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNumberOfVisits = async () => {
    try {
      const response = await axiosInstanceWithAuth.get(
        "/heathcares/v12/numberofgohospital"
      );
      setNumberOfVisits(response.data.numberOfVisits);
    } catch (error) {
      console.error("Error fetching number of hospital visits:", error);
    }
  };

  const totalSupport =
    yearlyData.length > 0
      ? yearlyData.reduce((acc, cur) => acc + parseFloat(cur.supportAmount), 0)
      : 0;

  const { width: screenWidth } = Dimensions.get("window");

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4E74F9" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Healthcare</Text>
          </View>
          <ScrollView>
            <View style={{ paddingBottom: 20 }}>
              <View style={styles.notesContainer}>
                <Text style={styles.notesTitle}>IMPORTANT NOTES</Text>
                {[
                  "Every month, each student contributes 20,000 dong to support patients.",
                  "Patients whose expenses are less than 300,000 dong do not receive support.",
                  "Patients with expenses between 300,000 and 1,000,000 dong receive 70% support.",
                  "Patients with expenses between 1,000,000 and 5,000,000 dong receive 60% support.",
                  "Patients with expenses between 5,000,000 and 10,000,000 dong receive 50% support.",
                  "Patients with expenses over 10,000,000 dong receive a fixed support amount of 5,000,000 dong.",
                ].map((note, index) => (
                  <View style={styles.noteItem} key={index}>
                    <MaterialCommunityIcons
                      name="checkbox-marked"
                      size={16}
                      color="#4e74f9"
                    />
                    <Text style={styles.noteText}>{note}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.countContainer}>
                <Text style={styles.countText}>
                  Admin Support: {totalSupport} Đ
                </Text>
                <Text style={styles.countText}>
                  Go Hospital: {numberOfVisits}
                </Text>
              </View>

              <View style={styles.chartContainer}>
                {yearlyData.length > 0 && (
                  <LineChart
                    data={{
                      labels: yearlyData.map((data) => data.year.toString()),
                      datasets: [
                        {
                          data: yearlyData.map((data) =>
                            parseFloat(data.supportAmount)
                          ),
                        },
                      ],
                    }}
                    width={screenWidth - 40} // 20 padding on each side
                    height={220}
                    yAxisLabel="Đ"
                    chartConfig={{
                      backgroundGradientFrom: "#FFFFFF",
                      backgroundGradientTo: "#FFFFFF",
                      decimalPlaces: 2,
                      color: (opacity = 1) => `rgba(78, 116, 249, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#4e74f9",
                      },
                    }}
                    bezier
                    style={styles.chart}
                  />
                )}
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.registerButton]}
                  onPress={() => setIsModalRegisterhealthcare(true)}
                >
                  <Text style={styles.buttonText}>
                    Register for Health Support
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.contributeButton]}
                  onPress={() => setIsModalContributes(true)}
                >
                  <Text style={styles.buttonText}>
                    Contribute to Healthcare
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      <ModalRegisterHealthcare
        setIsModalRegisterhealthcare={setIsModalRegisterhealthcare}
        isModalRegisterhealthcare={isModalRegisterhealthcare}
      />
      <ModalContributeHealthcare
        isModalContributes={isModalContributes}
        setIsModalContributes={setIsModalContributes}
      />
    </>
  );
}

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
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 10,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 50,
  },
  notesContainer: {
    padding: 20,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4e74f9",
  },
  noteItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  noteText: {
    fontSize: 14,
    marginLeft: 5,
    flex: 1,
    flexWrap: "wrap",
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  countText: {
    fontSize: 16,
    color: "#4e74f9",
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#4CAF50", // Green color
    marginRight: 10,
  },
  contributeButton: {
    backgroundColor: "#FF9800", // Orange color
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
