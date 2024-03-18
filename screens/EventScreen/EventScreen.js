import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const EventScreen = () => {
  const navigation = useNavigation();
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [event, setEvent] = useState([]);
  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios(
        `http://192.168.1.4:3000/events/v9/allevent?year=${selectedYear}`
      );
      setEvent(res.data);
    };
    fetchEvent();
  }, [selectedYear]);

  const handleClickEvent = (event) => {
    navigation.navigate("detailevent", { eventId: event.id });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleClickEvent(item)}
    >
      <Image source={{ uri: item.eventImage }} style={styles.eventImage} />
      <Text style={styles.eventTitle}>{item.eventName}</Text>
      <Text style={styles.eventLocation}>{item.eventLocation}</Text>
      <Text style={styles.eventDate}>{item.eventDate}</Text>
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
        <Text style={styles.headerTitle}>Event</Text>
      </View>
      <View style={styles.pickerContainer}>
        <View style={styles.pickerContainer2}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
            style={styles.picker}
          >
            <Picker.Item
              label={new Date().getFullYear().toString()}
              value={new Date().getFullYear().toString()}
            />
            <Picker.Item label="2022" value="2022" />
            <Picker.Item label="2023" value="2023" />
          </Picker>
        </View>
      </View>
      <FlatList
        data={event}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default EventScreen;

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
  itemContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: "center",
    flex: 1,
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  pickerContainer2: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    // paddingVertical: 8,
    // paddingHorizontal: 12,
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  picker: {
    width: "100%",
  },
});
