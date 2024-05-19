import React, { createContext, useState, useEffect, useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import base64 from "base-64";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState("");
  const [loading, setLoading] = useState(true);
  const [userIdFromToken, setUserIdFromToken] = useState(null);
  const getAuthState = async () => {
    try {
      const authDataString = await SecureStore.getItemAsync("auth");
      if (authDataString) {
        setAuthState(authDataString);
        const decodedToken = JSON.parse(
          base64.decode(authDataString.split(".")[1])
        );
        if (decodedToken && decodedToken.id) {
          setUserIdFromToken(decodedToken.id); // Change to setUserIdFromToken
        }
      }
    } catch (err) {
      console.error("Error getting auth state:", err);
    } finally {
      setLoading(false);
    }
  };

  const setAuth = async (auth) => {
    try {
      await SecureStore.setItemAsync("auth", auth);
      setAuthState(auth);
      const decodedToken = JSON.parse(base64.decode(auth.split(".")[1]));
      if (decodedToken && decodedToken.id) {
        setUserIdFromToken(decodedToken.id);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAuthState();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const axiosInstanceWithAuth = axios.create({
    baseURL: "http://192.168.1.4:3000",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });

  const axiosInstance = axios.create({
    baseURL: "http://192.168.1.4:3000",
  });

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        userIdFromToken,
        axiosInstanceWithAuth,
        axiosInstance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, AuthContext };
