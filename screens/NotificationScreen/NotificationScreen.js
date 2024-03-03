import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const notifications = [
    { id: 1, title: "Notification 1" },
    { id: 2, title: "Notification 2" },
    { id: 3, title: "Notification 3" },
  ];
  const handleClickNotification = (item) => {
    navigation.navigate("notifcationdetail");
  };
  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationContainer}
      onPress={() => handleClickNotification(item)}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="bell" size={24} color="#4e74f9" />
          <Text style={styles.notificationName}>Name</Text>
        </View>
        <Text style={styles.notificationDate}>
          {new Date().toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.notificationTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default NotificationScreen;

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
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  notificationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  notificationDate: {
    fontSize: 14,
    color: "#666",
  },
  notificationTitle: {
    fontSize: 16,
    color: "#333",
  },
});
