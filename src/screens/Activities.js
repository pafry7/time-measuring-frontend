import * as React from "react";
import { Fab } from "../components/Fab";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import { Headline, Card, Title } from "react-native-paper";
import { useAuth } from "../context/auth-context";
import { client } from "../utils/client";

const Activities = ({ navigation }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();
  console.log(loading);

  const { width } = Dimensions.get("window");

  React.useEffect(() => {
    setLoading(true);
    const fetchFunction = async () => {
      console.log(user.id, "userid");
      const data = await client(`users/${user.id}/approaches`);
      console.log(data);
      setData(data);
    };
    try {
      fetchFunction();
    } catch (e) {
      console.error("error", e);
    } finally {
      setLoading(false);
    }
  }, []);

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
              elevation={1}
              style={{ marginBottom: 16, width: 0.9 * width }}
            >
              <Card.Title
                title="Bieg"
                subtitle={new Date(
                  activity.locations[0].timestamp
                ).toUTCString()}
              />
              <Card.Content
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Title style={{}}>{activity.id}</Title>
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
