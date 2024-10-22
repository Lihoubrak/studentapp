import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuthContext } from "../../contexts/AuthContext";

const ProfileDetailStudent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const { axiosInstance } = useAuthContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/users/v1/detail/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

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
        <Text style={styles.headerTitle}>Profile Detail</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.coverContainer}>
          <Image
            source={require("../../assets/icons/angkorwat.jpg")}
            style={styles.coverImage}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: user?.avatar.replace("localhost", "192.168.122.130"),
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileTextName}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.profileText}>Phone: {user?.phoneNumber}</Text>
            <Text style={styles.profileText}>Email:{user?.email}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="home" size={20} color="#FF5733" />
            <Text style={styles.detailLabel}>ROOM:</Text>
            <Text style={styles.detailValue}>{user?.Room?.roomNumber}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="school" size={20} color="#4682B4" />
            <Text style={styles.detailLabel}>SCHOOL:</Text>
            <Text style={styles.detailValue}>
              {user?.Major?.School.schoolName}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={20}
              color="#2E8B57"
            />
            <Text style={styles.detailLabel}>DEGREE:</Text>
            <Text style={styles.detailValue}>{user?.degree}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="code-tags"
              size={20}
              color="#FFA500"
            />
            <Text style={styles.detailLabel}>MAJOR:</Text>
            <Text style={styles.detailValue}>{user?.Major?.majorName}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
    alignItems: "center",
    position: "relative",
  },
  coverContainer: {
    marginBottom: 20,
  },
  coverImage: {
    width: windowWidth,
    height: windowHeight * 0.2,
    resizeMode: "cover",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: windowWidth - 40,
    top: 25,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
  },
  profileTextContainer: {
    flexDirection: "column",
  },
  profileTextName: {
    fontSize: 20,
    color: "#333",
    marginBottom: 5,
    fontWeight: "bold",
  },
  profileText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: 40,
    width: windowWidth - 40,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  detailItem: {
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    paddingVertical: 10,
    flexDirection: "row", // Added to ensure the label and value are horizontally aligned
  },
  detailLabel: {
    flex: 1, // Added to make label occupy 1/3 of the width
    fontWeight: "bold",
    marginRight: 5,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  detailValue: {
    flex: 2, // Added to make value occupy 2/3 of the width
    color: "#666",
    fontSize: 16,
    flexWrap: "wrap", // Added to allow text to wrap onto the next line if it exceeds the width
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileDetailStudent;
