import * as React from "react";
import { useTheme, Headline } from "react-native-paper";
import { View, StyleSheet, LogBox } from "react-native";
import CountdownCircle from "react-native-countdown-circle";
import { client } from "../utils/requests";
import { useAuth } from "../context/auth-context";

const Countdown = ({ route, navigation }) => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const { contestId } = route.params;
  console.log(user.id, contestId);

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
        onTimeElapsed={async () => {
          const response = await client("activities", {
            body: {
              challenge_id: contestId,
              user_id: user.id,
            },
          });
          navigation.push("RunningScreen", { activityId: response.id });
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
