import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Contests } from "../screens/Contests";
import { Activities } from "../screens/Activities";
import { Menu } from "../screens/Menu";
import { Profile } from "../screens/Profile";
import { ChooseActivity } from "../screens/ChooseActivity";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { Countdown } from "../screens/Countdown";
import { RunSummary } from "../screens/RunSummary";
import { RunningScreen } from "../screens/RunningScreen";
import { ChooseContest } from "../screens/ChooseContest";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Menu"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "";
          if (route.name === "Profil") {
            iconName = focused ? "account" : "account-outline";
          } else if (route.name === "Zawody") {
            iconName = "bullseye-arrow";
          } else if (route.name === "Aktywności") {
            iconName = "run";
          } else if (route.name === "Menu") {
            iconName = focused ? "home" : "home-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#4F459C",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Profil" component={Profile} />
      <Tab.Screen name="Aktywności" component={Activities} />
      <Tab.Screen name="Zawody" component={Contests} />
    </Tab.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator headerMode={null}>
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="ChooseActivity" component={ChooseActivity} />
      <Stack.Screen name="ChooseContest" component={ChooseContest} />
      <Stack.Screen name="Countdown" component={Countdown} />
      <Stack.Screen name="RunningScreen" component={RunningScreen} />
      <Stack.Screen name="RunSummary" component={RunSummary} />
    </Stack.Navigator>
  );
};

export { HomeStack };
