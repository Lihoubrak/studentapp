import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

const NotificationContext = createContext();
export const useNotificationContext = () => useContext(NotificationContext);
export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const { auth } = useAuthContext();
  console.log("NotificationProvider");
  useEffect(() => {
    if (auth) fetchNotificationCount();
  }, []);
  const fetchNotificationCount = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.4:3000/notifications/v15/number-notification`,
        { headers: { Authorization: `Bearer ${auth}` } }
      );
      if (response.status === 200) {
        setNotificationCount(response.data.count);
      } else {
        console.error("Failed to fetch notification count:", response.status);
      }
    } catch (error) {
      console.error("Error fetching notification count:", error);
    }
  };
  return (
    <NotificationContext.Provider
      value={{ notificationCount, setNotificationCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
