import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";

const LeaderScreen = () => {
  const navigation = useNavigation();
  const { axiosInstanceWithAuth } = useAuthContext();
  const [dormitoryManagers, setDormitoryManagers] = useState([]);
  const [schoolManagers, setSchoolManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataLeader();
  }, []);

  const fetchDataLeader = async () => {
    try {
      const res = await axiosInstanceWithAuth.get(`/users/v1/leader`);
      if (res.data) {
        setDormitoryManagers(res.data.dormitoryManagers);
        setSchoolManagers(res.data.schoolManagers);
      }
    } catch (error) {
      Alert.alert("Error", error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickDetail = (item) => {
    navigation.navigate("detail", { userId: item.id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleClickDetail(item)}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: item.avatar.replace("localhost", "192.168.122.130") }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.role}>{item.role}</Text>
        <Text style={styles.phoneNumber}>Phone: {item.phoneNumber}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
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
        <Text style={styles.headerTitle}>Leader</Text>
      </View>
      <View style={styles.managerListSchool}>
        <Text style={styles.sectionTitle}>School Managers</Text>
        <FlatList
          data={schoolManagers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.managerListDormitory}>
        <Text style={styles.sectionTitle}>Dormitory Managers</Text>
        <FlatList
          data={dormitoryManagers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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
    paddingTop: 40, // increased padding
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 40, // adjusted position
    zIndex: 1,
  },
  managerListSchool: {
    flex: 1,
    marginTop: 20,
  },
  managerListDormitory: {
    flex: 3,
  },
  sectionTitle: {
    fontSize: 18, // increased font size
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
    color: "#333333",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20, // increased padding
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000", // added shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 10,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  role: {
    fontSize: 14,
    color: "#666",
  },
  phoneNumber: {
    fontSize: 14,
    color: "#555",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LeaderScreen;
