import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const Fab = ({ navigation }) => (
  <FAB
    style={styles.fab}
    icon="plus"
    onPress={() => navigation.push("ChooseActivity")}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export { Fab };
