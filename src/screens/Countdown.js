import * as React from "react";
import { useTheme, Headline } from "react-native-paper";
import { View, StyleSheet, LobGOx, LogBox } from "react-native";
import CountdownCircle from "react-native-countdown-circle";

const Countdown = ({ navigation }) => {
  const { colors } = useTheme();

  //for now
  React.useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>Gotowy ?</Headline>
      <CountdownCircle
        seconds={5}
        radius={50}
        borderWidth={8}
        bgColor="white"
        color={colors.primary}
        textStyle={{ ...styles.textStyle, color: "black" }}
        shadowColor="#837cb9"
        onTimeElapsed={() => {
          navigation.push("RunningScreen");
        }}
      />
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
  textStyle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headline: {
    paddingBottom: 50,
    marginBottom: 50,
  },
});

export { Countdown };
