import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeTabs } from "./HomeTabs";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../context/auth-context";

const Router = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <HomeTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export { Router };
