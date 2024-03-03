import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabBottomBar } from "./navigation";
import {
  DormitoryScreen,
  ElectricalScreen,
  EventDetail,
  EventScreen,
  MessageChat,
  NotificationDetail,
  PassportScreen,
  ProfileDetailStudent,
  SchoolScreen,
  WaterScreen,
} from "./screens";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" component={TabBottomBar} />
        <Stack.Screen name="dorm" component={DormitoryScreen} />
        <Stack.Screen name="school" component={SchoolScreen} />
        <Stack.Screen name="passport" component={PassportScreen} />
        <Stack.Screen name="electrical" component={ElectricalScreen} />
        <Stack.Screen name="water" component={WaterScreen} />
        <Stack.Screen name="event" component={EventScreen} />
        <Stack.Screen name="detail" component={ProfileDetailStudent} />
        <Stack.Screen name="detailevent" component={EventDetail} />
        <Stack.Screen name="messagechat" component={MessageChat} />
        <Stack.Screen name="notifcationdetail" component={NotificationDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
