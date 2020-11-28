import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

const RunSummary = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Run summary</Text>
      <Button
        mode="contained"
        onPress={() => navigation.push("Home", { screen: "Menu" })}
      >
        Wróc do menu
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

export { RunSummary };
