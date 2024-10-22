import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Image } from "react-native";
import { fetchUserToken } from "../../utils";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { ModalEditProfile } from "../../components";
import { useNavigation } from "@react-navigation/native";
const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const { axiosInstanceWithAuth } = useAuthContext();
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstanceWithAuth.get(`/users/v1/detail`);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("setting")}
          style={styles.menuIconContainer}
        >
          <MaterialCommunityIcons name="cog" size={25} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.contentContainer}>
          <View style={styles.coverContainer}>
            <Image
              source={require("../../assets/icons/angkorwat.jpg")}
              style={styles.coverImage}
            />
          </View>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => setIsModalEdit(true)}
            >
              <MaterialCommunityIcons name="pencil" size={20} color="#FFFFFF" />
            </TouchableOpacity>
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
              <Text style={styles.profileText}>Email: {user?.email}</Text>
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
              <Text style={styles.detailValue}>{user?.Major.majorName}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons name="qrcode" size={20} color="#FFA500" />
              <Text style={styles.detailLabel}>QR CODE:</Text>
              <Image
                source={require("../../assets/icons/qrcode.png")}
                style={styles.qrCodeImage}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <ModalEditProfile
        isModalEdit={isModalEdit}
        setIsModalEdit={setIsModalEdit}
      />
    </View>
  );
};

export default ProfileScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  menuIconContainer: {
    position: "absolute",
    right: 20,
    top: 50,
  },
  headerContainer: {
    backgroundColor: "#4e74f9",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  contentContainer: {
    alignItems: "center",
    position: "relative",
  },
  coverContainer: {},
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
    zIndex: 10,
  },
  buttonEdit: {
    position: "absolute",
    top: 69,
    left: 75,
    backgroundColor: "red",
    padding: 1,
    borderRadius: 5,
    zIndex: 10,
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
    marginVertical: 40,
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
    flexDirection: "row",
  },
  detailLabel: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 5,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  detailValue: {
    flex: 2,
    color: "#666",
    fontSize: 16,
    flexWrap: "wrap",
  },
  qrCodeImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
