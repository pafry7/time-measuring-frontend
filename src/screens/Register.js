import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/auth-context";

const Register = () => {
  const { register, user } = useAuth();
  console.log("user in register", user);
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Button onPress={() => register()} title="test"></Button>
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

export { Register };
