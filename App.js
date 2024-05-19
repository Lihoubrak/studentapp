import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import AppContainer from "./navigation/AppContainer";
import { NotificationProvider } from "./contexts/NotificationContext";
import { MessageProvider } from "./contexts/MessageContext";
import "react-native-gesture-handler";
import { Provider } from "react-native-paper";
import { theme } from "./core/theme";
import { StripeProvider } from "@stripe/stripe-react-native";
import { FirebaseProvider } from "./contexts/FirebaseContext";
const STRIPE_KEY =
  "pk_test_51MsVL5FC5YM2xOXYE3uMFl3IoxCrZegwlQXlgsdwtc4mOburkOdKwUhV9MgouCpjrwIQJ2ywDTASZf4kxn8Bvodw00MsKamAwc";
export default function App() {
  return (
    <Provider theme={theme}>
      <AuthProvider>
        <FirebaseProvider>
          <MessageProvider>
            <NotificationProvider>
              <StripeProvider publishableKey={STRIPE_KEY}>
                <AppContainer />
              </StripeProvider>
            </NotificationProvider>
          </MessageProvider>
        </FirebaseProvider>
      </AuthProvider>
    </Provider>
  );
}
