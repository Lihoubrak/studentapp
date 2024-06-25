import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";

const SchoolScreen = () => {
  const navigation = useNavigation();
  const { axiosInstanceWithAuth } = useAuthContext();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [major, setMajor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstanceWithAuth.get(
          `/schools/v4/getstudentinmajor?year=${new Date().getFullYear()}`
        );
        setStudents(response.data.students);
        setMajor(response.data.major);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.studentItem}
      onPress={() => navigateToProfile(item.id)}
    >
      <Image
        source={{ uri: item.avatar.replace("localhost", "192.168.1.4") }}
        style={styles.avatar}
      />
      <Text style={styles.studentName}>
        {item.firstName} {item.lastName}
      </Text>
    </TouchableOpacity>
  );

  const navigateToProfile = (student) => {
    navigation.navigate("detail", { userId: student });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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
        <Text style={styles.headerTitle}>School</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: major.majorImage.replace("localhost", "192.168.1.4"),
            }}
            style={styles.image}
          />
          <Text style={styles.sectionTitle}>Major: {major.majorName}</Text>
        </View>
        <FlatList
          data={students}
          renderItem={renderItem}
          keyExtractor={(item) => item.username}
          showsVerticalScrollIndicator={false}
        />
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
  contentContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 0,
    paddingHorizontal: 10,
  },
  studentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3, // Add elevation for a slight shadow effect
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4e74f9", // Choose a color that contrasts well with the background
  },
  imageContainer: { alignItems: "center", marginBottom: 10 },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  loadingContainer: { alignItems: "center", justifyContent: "center", flex: 1 },
});

export default SchoolScreen;
