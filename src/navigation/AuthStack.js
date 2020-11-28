import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Register } from "../screens/Register";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export { AuthStack };
