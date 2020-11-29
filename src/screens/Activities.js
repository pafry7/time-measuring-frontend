import * as React from "react";
import { Fab } from "../components/Fab";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import { Headline, Card, Title, Text } from "react-native-paper";
import { useAuth } from "../context/auth-context";
import { client } from "../utils/client";
import { format } from "date-fns";

const Activities = ({ navigation }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth();

  const { width } = Dimensions.get("window");

  React.useEffect(() => {
    setLoading(true);
    const fetchFunction = async () => {
      console.log(user.id, "userid");
      const data = await client(
        `query ($id: String) {
  users(where: {id: {_eq: $id}}) {
    activities {
      locations
      id
      distance
      created_at
      challenge {
        name
      }
    }
  }
}
`,
        { id: user.id }
      );
      setData(data.data.users[0].activities);
      setLoading(false);
    };
    try {
      fetchFunction();
    } catch (e) {
      console.error("error", e);
    } finally {
    }
  }, [user.id]);

  return (
    <View style={styles.container}>
      <View style={{ height: 150, justifyContent: "center", marginLeft: 16 }}>
        <Headline>Aktywności</Headline>
      </View>
      <View style={{ alignItems: "center" }}>
        {loading ? (
          <ActivityIndicator />
        ) : data ? (
          data.map((activity) => (
            <Card
              key={activity.id}
              elevation={3}
              style={{ marginBottom: 16, width: 0.9 * width }}
            >
              <Card.Title
                title="Bieg"
                subtitle={format(
                  new Date(activity.created_at),
                  "dd.MM.yyyy HH:mm"
                )}
              />
              <Card.Content
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>Zawody: {activity.challenge.name}</Text>
                <Title>{activity.distance} km</Title>
              </Card.Content>
            </Card>
          ))
        ) : null}
      </View>
      <Fab navigation={navigation} />
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
