import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../context/auth-context";

const Profile = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button onPress={logout} title="delete jwt"></Button>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Profile };
