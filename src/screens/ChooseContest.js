import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Fab } from "../components/Fab";
import { useAuth } from "../context/auth-context";
import {
  Headline,
  Card,
  Title,
  Content,
  ActivityIndicator,
  Text,
} from "react-native-paper";
import { client } from "../utils/client";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";

const ChooseContest = ({ navigation }) => {
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

  const { height, width } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <View style={{ height: 150, justifyContent: "center", marginLeft: 16 }}>
        <Headline>Wybierz zawody</Headline>
      </View>
      <View style={{ alignItems: "center" }}>
        {loading ? (
          <ActivityIndicator />
        ) : data ? (
          data.map((zaw) => (
            <Card
              elevation={3}
              key={zaw.id}
              style={{ marginBottom: 16, width: 0.9 * width }}
              onPress={() =>
                navigation.push("Countdown", { contestId: zaw.id })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: 50,
                }}
              >
                <Title style={{ marginLeft: 8 }}>
                  {zaw.name ? zaw.name : "Nie wiadomo"}
                </Title>
                <MaterialCommunityIcons
                  style={{ marginRight: 8 }}
                  name="chevron-right"
                  size={24}
                  color="purple"
                />
              </View>
            </Card>
          ))
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export { ChooseContest };
