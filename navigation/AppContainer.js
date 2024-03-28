import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthContext } from "../contexts/AuthContext";
import {
  DormitoryScreen,
  ElectricalScreen,
  EventDetail,
  EventScreen,
  LoginScreen,
  MessageChat,
  NotificationDetail,
  PassportScreen,
  ProfileDetailStudent,
  SchoolScreen,
  WaterScreen,
} from "../screens";
import TabBottomBar from "./TabBottomBar";
const Stack = createNativeStackNavigator();
function AppContainer() {
  const { auth } = useAuthContext();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {auth ? (
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
          </>
        ) : (
          <Stack.Screen name="login" component={LoginScreen} />
        )} */}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
