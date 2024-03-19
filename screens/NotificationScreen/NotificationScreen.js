import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";
import { useSocketContext } from "../../contexts/SocketContext";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { auth } = useAuthContext();
  const { socket } = useSocketContext();
  const [notifications, setNotifications] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    socket?.on("newNotification", handleNewNotification);

    return () => {
      socket?.off("newNotification", handleNewNotification);
    };
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchNotification();
    }, [])
  );
  const fetchNotification = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.4:3000/notifications/v15/all`,
        { headers: { Authorization: `Bearer ${auth}` } }
      );
      setNotifications(res.data.reverse());
      scrollToTop();
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleNewNotification = (newNotification) => {
    setNotifications((prevNotifications) => [
      newNotification,
      ...prevNotifications,
    ]);
    scrollToTop();
  };

  const handleClickNotification = (item) => {
    navigation.navigate("notificationdetail", { notificationId: item.id });
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationContainer}
      onPress={() => handleClickNotification(item.Notification)}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="bell" size={24} color="#4e74f9" />
          <Text style={styles.notificationName}>
            {item?.Notification?.User?.Role?.roleName}
          </Text>
        </View>
        <Text
          style={[
            styles.notificationDate,
            !item.isSeen && styles.NotificationNotSeen,
          ]}
        >
          {new Date(item?.Notification?.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text
        style={[
          styles.notificationTitle,
          !item.isSeen && styles.NotificationNotSeen,
        ]}
      >
        {item?.Notification?.description}
      </Text>
    </TouchableOpacity>
  );

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  const memoizedRenderNotification = useMemo(() => renderNotification, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={notifications}
        renderItem={memoizedRenderNotification}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
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
  NotificationNotSeen: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
