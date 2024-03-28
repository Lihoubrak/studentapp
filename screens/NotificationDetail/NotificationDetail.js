import React, { useEffect, useState } from "react";
import {
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
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";
import RenderHtml from "react-native-render-html";
import WebView from "react-native-webview";
import IframeRenderer, { iframeModel } from "@native-html/iframe-plugin";
const NotificationDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { notificationId } = route.params;
  const [notificationDetail, setNotificationDetail] = useState(null);
  const { auth } = useAuthContext();
  const { width } = useWindowDimensions();
  console.log("NotificationDetail");
  const fetchNotification = async () => {
    try {
      const res = await axios.get(
        `http://192.168.1.4:3000/notifications/v15/detail/${notificationId}`
      );
      setNotificationDetail(res.data);
    } catch (error) {
      console.error("Error fetching notification detail:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchNotification();
    }, [notificationId])
  );
  useEffect(() => {
    console.log("NotificationDetail useEffect");
    const updateSeenNotification = async () => {
      try {
        await axios.put(
          `http://192.168.1.4:3000/notifications/v15/user-seen-notification/${notificationId}`,
          null,
          { headers: { Authorization: `Bearer ${auth}` } }
        );
      } catch (error) {
        console.error("Error updating seen notification:", error);
      }
    };
    updateSeenNotification();
  }, [notificationId]);
  const source = {
    html: notificationDetail?.content,
  };
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
          <Text style={styles.notificationTitle}>
            {notificationDetail?.description}
          </Text>
          <View style={{ alignItems: "center" }}>
            {notificationDetail && notificationDetail.content && (
              <RenderHtml
                WebView={WebView}
                renderers={{ iframe: IframeRenderer }}
                source={source}
                contentWidth={width}
                customHTMLElementModels={{
                  iframe: iframeModel,
                }}
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
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
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
  notificationDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  notificationTimestamp: {
    fontSize: 14,
    color: "#888",
  },
});
