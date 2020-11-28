import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Fab } from "../components/Fab";
import { useAuth } from "../context/auth-context";
import { Headline, Card, Title, Content } from "react-native-paper";
import { client } from "../utils/client";

const zawody = [
  {
    id: "tet",
    nama: "Zawody gminy",
    organizator: "Wojewoda",
    start: "20.11.2020",
    koniec: "31.12.2020",
  },
  {
    id: "tet",
    nama: "Zawody prywatne",
    organizator: "Patryk",
    start: "12.11.2020",
    koniec: "30.11.2020",
  },
];

const Contests = ({ navigation }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    setLoading(true);
    const fetchFunction = async () => {
      const data = await client(`users/${user.id}/challenges`);
      console.log("challanges", data);
      setData(data);
    };
    try {
      fetchFunction();
    } catch (e) {
      console.log(e, "error");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const { height, width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <View style={{ height: 150, justifyContent: "center", marginLeft: 16 }}>
        <Headline>Moje zawody</Headline>
      </View>
      <View style={{ alignItems: "center" }}>
        {zawody.map((zaw) => (
          <Card elevation={1} style={{ marginBottom: 16, width: 0.9 * width }}>
            <Card.Title
              title={zaw.name}
              subtitle={`${zaw.start}-${zaw.koniec}`}
            />
            {/* <Card.Content
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            > */}
            {/* <Title style={{}}>{zaw.duration}</Title>
              <Title>{activity.distance} km</Title> */}
            {/* </Card.Content> */}
          </Card>
        ))}
      </View>
      <Fab navigation={navigation} />
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
