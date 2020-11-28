import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStack } from "./HomeStack";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../context/auth-context";

const Router = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export { Router };
