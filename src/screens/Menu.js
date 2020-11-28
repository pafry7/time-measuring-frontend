import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Fab } from "../components/Fab";

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Menu</Text>
      <Fab onPress={() => navigation.push("Run", { screen: "Countdown" })} />
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

export { Menu };
