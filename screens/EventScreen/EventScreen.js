import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import { ModalPickerYear } from "../../components";

const EventScreen = () => {
  const navigation = useNavigation();
  const { axiosInstance } = useAuthContext();
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [events, setEvents] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(true); // New state to track loading

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true); // Set loading to true when starting fetch
      try {
        const res = await axiosInstance.get(
          `/events/v9/allevent?year=${selectedYear}`
        );
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Set loading to false when fetch completes
      }
    };
    fetchEvents();
  }, [selectedYear]);

  const handleClickEvent = (event) => {
    navigation.navigate("detailevent", { eventId: event.id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, events.length > 1 ? { flex: 1 } : null]}
      onPress={() => handleClickEvent(item)}
    >
      <Image
        source={{
          uri: item.eventImage.replace("localhost", "192.168.122.130"),
        }}
        style={styles.eventImage}
      />
      <Text style={styles.eventTitle}>{item.eventName}</Text>
      <Text style={styles.eventLocation}>{item.eventLocation}</Text>
      <Text style={styles.eventDate}>
        {new Date(item.eventDate._seconds * 1000).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  // Conditional rendering based on loading state
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
        <Text style={styles.headerTitle}>Event</Text>
      </View>
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={styles.filterButton}
        >
          <MaterialCommunityIcons name="filter" size={20} color="#007AFF" />
          <Text style={styles.filterButtonText}>Filter Year</Text>
        </TouchableOpacity>
        <Text style={[styles.filterButtonText, { color: "#666" }]}>
          {selectedYear}
        </Text>
      </View>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
      <ModalPickerYear
        showPicker={showPicker}
        setShowPicker={setShowPicker}
        selectedYear={selectedYear}
        setSelectedYear={(year) => {
          setSelectedYear(year);
          setShowPicker(false); // Close the picker modal when a year is selected
        }}
      />
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
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
  itemContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: "center",
    elevation: 3,
  },
  eventImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#FF5733", // Orange
    textAlign: "center",
  },
  eventLocation: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#3CAEA3", // Teal
    textAlign: "center",
  },
  eventDate: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#7A5195", // Purple
    textAlign: "center",
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  filterButtonText: {
    fontSize: 16,
    color: "#007AFF",
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
