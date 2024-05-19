import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import { WebView } from "react-native-webview";

const NotificationDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { notificationId } = route.params;
  const [notificationDetail, setNotificationDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { axiosInstanceWithAuth } = useAuthContext();
  const { width, height } = useWindowDimensions();

  const fetchNotification = async () => {
    try {
      const res = await axiosInstanceWithAuth.get(
        `notifications/v15/detail/${notificationId}`
      );
      setNotificationDetail(res.data);
      setLoading(false); // Set loading to false after receiving response
    } catch (error) {
      console.error("Error fetching notification detail:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Set loading to true when the screen is focused
      fetchNotification();
    }, [notificationId])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4e74f9" />
      </View>
    );
  }
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      ${notificationDetail.data.content}
    </body>
  </html>
`;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Detail</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.bodyContainer}>
          <Text style={styles.notificationTitle}>
            {notificationDetail?.data.description}
          </Text>
          <View style={{ width: width, height: height }}>
            {notificationDetail && notificationDetail.data.content && (
              <WebView
                originWhitelist={["*"]}
                source={{ html: htmlContent }}
                style={styles.webview}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationDetail;

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
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
