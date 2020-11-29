import * as React from "react";
import { useTheme, Headline, Card, Title, Text } from "react-native-paper";
import { View, StyleSheet, LogBox } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const ChooseActivity = ({ navigation }) => {
  const { colors } = useTheme();

  const activities = [
    {
      name: "Bieganie",
      color: "green",
      icon: <MaterialCommunityIcons name="run" size={36} color="white" />,
    },

    {
      name: "Rower",
      color: "pink",
      icon: <MaterialCommunityIcons name="bike" size={36} color="white" />,
    },
    {
      name: "Fitness",
      color: "teal",
      icon: <MaterialIcons name="fitness-center" size={36} color="white" />,
    },
    {
      name: "Rolki",
      color: "orange",
      icon: (
        <MaterialCommunityIcons name="rollerblade" size={36} color="white" />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>Co dzisiaj planujesz?</Headline>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {activities.map((activity, index) => (
          <TouchableOpacity
            onPress={() => navigation.push("ChooseContest")}
            key={index}
          >
            <Card
              elevation={1}
              style={{
                backgroundColor: activity.color,
                borderRadius: 12,
                height: 150,
                width: 125,
                alignItems: "center",
                marginTop: 8,
                marginLeft: 8,
                marginRight: 8,
              }}
            >
              <Card.Content>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {activity.icon}
                  <Text style={{ marginTop: 4 }}>{activity.name}</Text>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headline: {
    marginTop: 70,
    paddingBottom: 50,
    marginBottom: 40,
  },
});

export { ChooseActivity };
