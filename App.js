import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { AuthProvider } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";
import AppContainer from "./navigation/AppContainer";
import { NotificationProvider } from "./contexts/NotificationContext";
import { MessageProvider } from "./contexts/MessageContext";
export default function App() {
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  // // console.log("notification", notification);
  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: true,
  //     shouldSetBadge: true,
  //   }),
  // });
  // useEffect(() => {
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log("response", response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <AuthProvider>
      <SocketProvider>
        <MessageProvider>
          <NotificationProvider>
            <AppContainer />
          </NotificationProvider>
        </MessageProvider>
      </SocketProvider>
    </AuthProvider>
  );
}
