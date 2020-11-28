import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/auth-context";
import { Button } from "react-native-paper";

const Profile = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button mode="contained" onPress={logout}>
        Delete jwt
      </Button>
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
