import * as React from "react";
import { Fab } from "../components/Fab";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const Activities = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Activities</Text>
      <StatusBar style="auto" />
      <Fab onPress={() => navigation.push("Run", { screen: "Countdown" })} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Activities };
