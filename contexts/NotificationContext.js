import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { useFirebase } from "./FirebaseContext";

const NotificationContext = createContext();
export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const { userIdFromToken } = useAuthContext();
  const [notificationCount, setNotificationCount] = useState(0);
  const { db } = useFirebase();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "notifications"),
        where("recipients", "array-contains", {
          userId: userIdFromToken,
          isSeen: false,
        })
      ),
      (snapshot) => {
        let count = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.recipients.some(
              (recipient) =>
                recipient.userId === userIdFromToken && !recipient.isSeen
            )
          ) {
            count++;
          }
        });
        setNotificationCount(count);
      }
    );

    return () => unsubscribe();
  }, [userIdFromToken]);

  return (
    <NotificationContext.Provider
      value={{ notificationCount, setNotificationCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
