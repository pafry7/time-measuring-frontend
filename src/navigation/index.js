import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStack } from "./HomeStack";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../context/auth-context";
import { Text } from "react-native";
import * as SecureStore from "expo-secure-store";

const PERSISTENCE_KEY = "NAVIGATION_STATE";
const Router = () => {
  const { user } = useAuth();
  const [isReady, setIsReady] = React.useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await SecureStore.getItemAsync(
          PERSISTENCE_KEY
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;

        if (state !== undefined) {
          setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    <Text>app state</Text>;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) =>
        SecureStore.setItemAsync(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export { Router };
