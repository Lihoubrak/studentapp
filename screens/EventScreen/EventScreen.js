import React, { useState } from "react";
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

const EventScreen = () => {
  const navigation = useNavigation();
  const [selectedYear, setSelectedYear] = useState("Fliter");

  // Sample data
  const eventData = [
    {
      id: 1,
      title: "Khmer New Year",
      location: "Hanoi",
      date: new Date().toDateString(),
      image: require("../../assets/icons/khmernewyear.jpg"),
    },
    {
      id: 2,
      title: "Khmer New Year",
      location: "Hanoi",
      date: new Date().toDateString(),
      image: require("../../assets/icons/khmernewyear.jpg"),
    },
    {
      id: 3,
      title: "Khmer New Year",
      location: "Hanoi",
      date: new Date().toDateString(),
      image: require("../../assets/icons/khmernewyear.jpg"),
    },
    {
      id: 4,
      title: "Khmer New Year",
      location: "Hanoi",
      date: new Date().toDateString(),
      image: require("../../assets/icons/khmernewyear.jpg"),
    },
    {
      id: 5,
      title: "Khmer New Year",
      location: "Hanoi",
      date: new Date().toDateString(),
      image: require("../../assets/icons/khmernewyear.jpg"),
    },
    {
      id: 6,
      title: "Khmer New Year",
      location: "Hanoi",
      date: new Date().toDateString(),
      image: require("../../assets/icons/khmernewyear.jpg"),
    },
    {
      id: 7,
      title: "Khmer New Year",
      location: "Hanoi",
      date: new Date().toDateString(),
      image: require("../../assets/icons/khmernewyear.jpg"),
    },
    {
      id: 8,
      title: "Khmer New Year",
      location: "Hanoi",
      date: new Date().toDateString(),
      image: require("../../assets/icons/khmernewyear.jpg"),
    },
  ];
  const handleClickEvent = (event) => {
    navigation.navigate("detailevent");
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleClickEvent(item)}
    >
      <Image source={item.image} style={styles.eventImage} />
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventLocation}>{item.location}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Fliter" value="Fliter" />
          <Picker.Item label="2022" value="2022" />
          <Picker.Item label="2023" value="2023" />
          <Picker.Item label="2024" value="2024" />
          {/* Add other years here */}
        </Picker>
      </View>
      <FlatList
        data={eventData}
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
  },
  headerTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 10,
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
    backgroundColor: "#ECEFF1",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 3,
  },
  picker: {
    width: "100%",
  },
});
