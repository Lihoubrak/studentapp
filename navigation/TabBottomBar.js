import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  HomeScreen,
  MessageScreen,
  NotificationScreen,
  ProfileScreen,
} from "../screens";

const Tab = createMaterialBottomTabNavigator();

const routes = [
  {
    name: "Home",
    component: HomeScreen,
    options: {
      tabBarLabel: "Home",
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="home" color={color} size={26} />
      ),
    },
  },
  {
    name: "Message",
    component: MessageScreen,
    options: {
      tabBarLabel: "Message",
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="message" color={color} size={26} />
      ),
    },
  },
  {
    name: "Notification",
    component: NotificationScreen,
    options: {
      tabBarLabel: "Notification",
      tabBarBadge: 3,
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="bell" color={color} size={26} />
      ),
    },
  },
  {
    name: "Profile",
    component: ProfileScreen,
    options: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="account" color={color} size={26} />
      ),
    },
  },
];

const TabBottomBar = () => {
  return (
    <Tab.Navigator
      shifting={true}
      activeColor="#6200ee"
      inactiveColor="#8e8e8e"
      barStyle={{ backgroundColor: "#ffffff" }}
    >
      {routes.map((route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabBottomBar;
