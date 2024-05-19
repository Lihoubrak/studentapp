import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthContext } from "../contexts/AuthContext";
import {
  DormitoryScreen,
  ElectricalScreen,
  EventDetail,
  EventScreen,
  HealthcareScreen,
  LeaderScreen,
  LoginScreen,
  MessageChat,
  NotificationDetail,
  PassportScreen,
  PaymentScreen,
  ProfileDetailStudent,
  SchoolScreen,
  SettingScreen,
  WaterScreen,
} from "../screens";
import TabBottomBar from "./TabBottomBar";
import { DangNotificationProvider } from "../contexts/DangNotificationContext";
const Stack = createNativeStackNavigator();
function AppContainer() {
  const { auth } = useAuthContext();
  return (
    <NavigationContainer>
      <DangNotificationProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {auth ? (
            <>
              <Stack.Screen name="tabBottomBar" component={TabBottomBar} />
              <Stack.Screen name="dorm" component={DormitoryScreen} />
              <Stack.Screen name="school" component={SchoolScreen} />
              <Stack.Screen name="passport" component={PassportScreen} />
              <Stack.Screen name="electrical" component={ElectricalScreen} />
              <Stack.Screen name="water" component={WaterScreen} />
              <Stack.Screen name="event" component={EventScreen} />
              <Stack.Screen name="detail" component={ProfileDetailStudent} />
              <Stack.Screen name="detailevent" component={EventDetail} />
              <Stack.Screen name="messagechat" component={MessageChat} />
              <Stack.Screen
                name="notificationdetail"
                component={NotificationDetail}
              />
              <Stack.Screen name="leader" component={LeaderScreen} />
              <Stack.Screen name="healthcare" component={HealthcareScreen} />
              <Stack.Screen name="payment" component={PaymentScreen} />
              <Stack.Screen
                name="setting"
                component={SettingScreen}
                options={{
                  headerShown: false,
                  presentation: "modal",
                  animationTypeForReplace: "push",
                  animation: "slide_from_right",
                }}
              />
            </>
          ) : (
            <Stack.Screen name="login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </DangNotificationProvider>
    </NavigationContainer>
  );
}

export default AppContainer;
