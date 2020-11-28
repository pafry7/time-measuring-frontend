import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Contests } from "../screens/Contests";
import { Activities } from "../screens/Activities";
import { Profile } from "../screens/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "";
          if (route.name === "Profile") {
            iconName = focused ? "map-marker" : "map-marker-outline";
          } else if (route.name === "Contests") {
            iconName = focused ? "star" : "star-outline";
          } else if (route.name === "Activities") {
            iconName = focused ? "calendar" : "calendar-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "orange",
      }}
    >
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Contests" component={Contests} />
    </Tab.Navigator>
  );
};

export { HomeTabs };
