import * as React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Fab } from "../components/Fab";
import { useAuth } from "../context/auth-context";
import {
  Headline,
  Card,
  Title,
  Content,
  ActivityIndicator,
} from "react-native-paper";
import { client } from "../utils/client";
import { format } from "date-fns";

const Contests = ({ navigation }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    setLoading(true);
    const fetchFunction = async () => {
      const data = await client(
        `query MyQuery2($id:String) {
   users(where: {id: {_eq: $id}}) {
    challenges {
      name
      id
      end_time
      created_at
      prize
      start_time
      type
    }
  }
}
`,
        { id: user.id }
      );
      setData(data.data.users[0].challenges);
      setLoading(false);
    };
    try {
      fetchFunction();
    } catch (e) {
      console.log(e, "error");
    }
  }, [user]);
  const renderItem = ({ item }) => {
    return (
      <Card
        key={item.id}
        elevation={3}
        style={{ marginBottom: 16, width: 0.9 * width }}
      >
        <Card.Title
          title={item.name}
          subtitle={`${format(
            new Date(item.start_time),
            "dd.MM.yyyy HH:mm"
          )}-${format(new Date(item.end_time), "dd.MM.yyyy HH:mm")}`}
        />
        <Card.Content
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Title style={{}}>Typ: {item.type}</Title>
        </Card.Content>
      </Card>
    );
  };

  const { height, width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <View style={{ height: 150, justifyContent: "center", marginLeft: 16 }}>
        <Headline>Moje zawody</Headline>
      </View>
      <View style={{ alignItems: "center" }}>
        {loading ? (
          <ActivityIndicator />
        ) : data ? (
          <FlatList
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            data={data}
          />
        ) : null}
      </View>
      <Fab navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export { Contests };
