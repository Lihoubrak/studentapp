import { createContext, useState, useEffect, useContext, useRef } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import { fetchUserToken } from "../utils";

export const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const { auth } = useAuthContext();
  console.log(onlineUsers);
  useEffect(() => {
    const newSocket = io("http://192.168.1.4:3000");
    socketRef.current = newSocket;
    fetchUserToken(auth).then((user) => {
      setUserId(user.id);
    });
    socketRef.current.on("newMessage", (newMessage) => {
      setMessages(newMessage);
    });
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      socketRef.current.emit("addUser", userId);
      socketRef.current.on("getUsers", (users) => {
        setOnlineUsers(users);
      });
    }
  }, [userId]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        onlineUsers,
        realtimeMessage: messages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
