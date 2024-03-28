import React, { createContext, useState, useEffect, useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("AuthProvider");
  const getAuthState = async () => {
    try {
      const authDataString = await SecureStore.getItemAsync("auth");
      if (authDataString) {
        setAuthState(authDataString);
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
    } catch (error) {
      console.error("Error setting auth state:", error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, [auth]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, AuthContext };
