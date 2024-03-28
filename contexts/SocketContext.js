import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import { fetchUserToken } from "../utils";

export const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { auth } = useAuthContext();

  useEffect(() => {
    // Create socket connection only if not already established
    if (!socketRef.current) {
      const newSocket = io("http://192.168.1.4:3000");
      socketRef.current = newSocket;
      console.log("connect");
      // Fetch user token and add user on connection
      fetchUserToken(auth).then((user) => {
        if (user?.id) {
          socketRef.current.emit("addUser", user.id);
        }
      });

      // Listen for userList event
      socketRef.current.on("userList", (users) => {
        setOnlineUsers(users);
      });

      // Handle disconnection
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [auth]);

  // Send heartbeat message every 30 seconds
  useEffect(() => {
    const heartbeatInterval = setInterval(() => {
      if (socketRef.current) {
        socketRef.current.emit("heartbeat");
      }
    }, 30000);

    return () => {
      clearInterval(heartbeatInterval);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
