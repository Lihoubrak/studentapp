// TabBottomBar.js
import React, { useContext } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  HomeScreen,
  MessageScreen,
  NotificationScreen,
  ProfileScreen,
} from "../screens";
import { useNotificationContext } from "../contexts/NotificationContext";
import { useMessageContext } from "../contexts/MessageContext";

const Tab = createMaterialBottomTabNavigator();

const TabBottomBar = () => {
  const { notificationCount } = useNotificationContext();
  const { messageCount } = useMessageContext();

  return (
    <Tab.Navigator
      shifting={true}
      activeColor="#6200ee"
      inactiveColor="#8e8e8e"
      barStyle={{
        backgroundColor: "#ffffff",

        borderTopColor: "#eee",
        borderTopWidth: 1,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarLabel: "Message",
          tabBarBadge: messageCount > 0 ? messageCount : null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notification",
          tabBarBadge: notificationCount > 0 ? notificationCount : null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBottomBar;
