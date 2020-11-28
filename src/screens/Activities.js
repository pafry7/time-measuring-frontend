import * as React from "react";
import { Fab } from "../components/Fab";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Headline, Card, Button, Title } from "react-native-paper";

const activities = [
  {
    distance: 100,
    id: 1,
    verified: false,
    duration: "30 minut",
    date: "28.12.2020",
    locations: [
      { longitude: 50, latitude: 19 },
      { longitude: 50, latitude: 19 },
    ],
  },
  {
    distance: 50,
    id: 1,
    date: "27.12.2020",
    verified: false,
    duration: "1,5 godziny",
    locations: [
      { longitude: 50, latitude: 19 },
      { longitude: 50, latitude: 19 },
    ],
  },
];

const Activities = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <View style={{ height: 150, justifyContent: "center", marginLeft: 16 }}>
        <Headline>Activities</Headline>
      </View>
      <View style={{ alignItems: "center" }}>
        {activities.map((activity) => (
          <Card elevation={1} style={{ marginBottom: 16, width: 0.9 * width }}>
            <Card.Title title="Bieg" subtitle={activity.date} />
            <Card.Content>
              <Title>Card title</Title>
            </Card.Content>
          </Card>
        ))}
      </View>
      <Fab onPress={() => navigation.push("Run", { screen: "Countdown" })} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
});

export { Activities };
