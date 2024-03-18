import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuthContext } from "../../contexts/AuthContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const BottomIcon = [
    { title: "Dormitory", image: require("../../assets/icons/dormitory.png") },
    { title: "School", image: require("../../assets/icons/school.png") },
    { title: "Passport", image: require("../../assets/icons/passport.png") },
    { title: "Event", image: require("../../assets/icons/event.png") },
    {
      title: "Electrical",
      image: require("../../assets/icons/electrical.png"),
    },
    { title: "Water", image: require("../../assets/icons/water.png") },
    { title: "Heathcare", image: require("../../assets/icons/heathcare.png") },
    { title: "Leader", image: require("../../assets/icons/leader.png") },
  ];
  const { setAuth } = useAuthContext();
  const handleButtonClick = (title) => {
    if (title === "Dormitory") navigation.navigate("dorm");
    if (title === "School") setAuth("");
    if (title === "Passport") navigation.navigate("passport");
    if (title === "Electrical") navigation.navigate("electrical");
    if (title === "Water") navigation.navigate("water");
    if (title === "Event") navigation.navigate("event");
  };
  const renderImageButtom = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleButtonClick(item.title)}
      >
        <View style={{ alignItems: "center" }}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/icons/logo.png")}
            style={styles.logo}
          />
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hello,</Text>
            <Text style={styles.greetingText}>Good Morning</Text>
          </View>
        </View>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={24} color="#333" />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#666"
          />
        </View>
      </View>
      <FlatList
        data={BottomIcon}
        renderItem={renderImageButtom}
        keyExtractor={(item) => item.title}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    backgroundColor: "#4e74f9",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingContainer: {
    marginRight: 10,
  },
  greetingText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 50,
  },
  searchBar: {
    backgroundColor: "#E0E0E0",
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: "center",
    flex: 1,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
});
