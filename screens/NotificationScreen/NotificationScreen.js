import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { db } = useFirebase();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userIdFromToken } = useAuthContext();
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const q = query(
          collection(db, "notifications"),
          orderBy("sentAt", "desc")
        );

        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
          const userNotifications = [];
          for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const recipients = data.recipients || [];

            recipients.forEach((recipient) => {
              if (recipient.userId === userIdFromToken) {
                userNotifications.push({
                  id: doc.id,
                  data: data,
                  recipients: recipients,
                });
              }
            });
          }
          setNotifications(userNotifications);
          setLoading(false);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleClickNotification = (item) => {
    navigation.navigate("notificationdetail", { notificationId: item.id });
  };

  const renderNotificationItem = ({ item }) => {
    const { description, sentAt } = item.data;
    const isSeen = item.recipients.some(
      (recipient) => recipient.isSeen && recipient.userId === userIdFromToken
    );
    const sentAtDate = sentAt.toDate().toLocaleDateString();

    return (
      <TouchableOpacity
        style={[
          styles.notificationContainer,
          !isSeen && styles.notificationUnseen,
        ]}
        onPress={() => handleClickNotification(item)}
      >
        <View style={styles.notificationHeader}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="bell" size={24} color="#4e74f9" />
          </View>
          <Text style={styles.notificationDate}>{sentAtDate.toString()}</Text>
        </View>
        <Text style={styles.notificationTitle}>{description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      {loading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#4e74f9"
        />
      ) : notifications.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyStateText}>No notifications to show</Text>
      )}
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
  notificationDate: {
    fontSize: 14,
    color: "#666",
  },
  notificationTitle: {
    fontSize: 16,
    color: "#333",
  },
  notificationUnseen: {
    backgroundColor: "#f5f5f5",
  },
  emptyStateText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
