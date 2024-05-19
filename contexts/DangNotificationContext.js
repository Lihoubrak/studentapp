import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "./AuthContext";

const DangNotificationContext = createContext();

export const useDangNotification = () => useContext(DangNotificationContext);

export const DangNotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const { auth } = useAuthContext();
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          // Extract the screen name and notificationId from the notification data
          const { screen } = response.notification.request.content.data;
          const notificationId =
            response.notification.request.content.data?.notificationId;

          // Check if user is logged in
          if (!!auth) {
            // Determine the screen to navigate to based on the notification data
            if (screen === "messagechat") {
              // If it's a chat notification, navigate to the chat detail screen with receiverId
              navigation.navigate(screen, { receiverId: notificationId });
            } else if (screen === "notificationdetail") {
              // If it's a notification detail notification, navigate to the notification detail screen
              navigation.navigate(screen, { notificationId });
            } else if (screen === "passport") {
              navigation.navigate(screen);
            } else {
              navigation.navigate(screen);
            }
          } else {
            navigation.navigate("login");
          }
        }
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [auth]);
  return (
    <DangNotificationContext.Provider value={{ notification }}>
      {children}
    </DangNotificationContext.Provider>
  );
};
