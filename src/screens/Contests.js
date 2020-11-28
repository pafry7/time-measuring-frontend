import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Fab } from "../components/Fab";

const Contests = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Contests</Text>
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

export { Contests };
