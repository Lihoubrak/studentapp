import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

const MessageContext = createContext();
export const useMessageContext = () => useContext(MessageContext);
export const MessageProvider = ({ children }) => {
  const [messageCount, setMessageCount] = useState(0);
  const { auth } = useAuthContext();
  console.log("MessageProvider");
  useEffect(() => {
    if (auth) fetchMessageCount();
  }, []);
  const fetchMessageCount = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.4:3000/messages/v16/number-message`,
        { headers: { Authorization: `Bearer ${auth}` } }
      );
      if (response.status === 200) {
        setMessageCount(response.data.count);
      } else {
        console.error("Failed to fetch message count:", response.status);
      }
    } catch (error) {
      console.error("Error fetching message count:", error);
    }
  };
  return (
    <MessageContext.Provider value={{ messageCount, setMessageCount }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
