import React, { createContext, useState, useContext, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuthContext } from "./AuthContext";
import { useFirebase } from "./FirebaseContext";

const MessageContext = createContext();
export const useMessageContext = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messageCount, setMessageCount] = useState(0);
  const { userIdFromToken } = useAuthContext();
  const { db } = useFirebase();

  useEffect(() => {
    const fetchMessageCount = () => {
      try {
        const messagesCollection = collection(db, "messages");
        const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
          let count = 0;
          snapshot.forEach((doc) => {
            const data = doc.data();
            // Check if the message is sent to the current user and is not seen by the current user
            if (
              data.receiverId === userIdFromToken &&
              !data.seenBy[userIdFromToken]
            ) {
              count++;
            }
          });
          setMessageCount(count);
        });
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching message count:", error);
      }
    };

    const unsubscribe = fetchMessageCount();

    // Clean up the subscription when the component unmounts or userIdFromToken changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userIdFromToken]);

  return (
    <MessageContext.Provider value={{ messageCount, setMessageCount }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
