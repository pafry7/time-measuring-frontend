import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Fab } from "../components/Fab";
import Carousel from "react-native-snap-carousel";
import { format } from "date-fns";
import { Headline, Card, Title, ActivityIndicator } from "react-native-paper";
import { useAuth } from "../context/auth-context";
import { client } from "../utils/client";

const Menu = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const { user } = useAuth();

  const colors = ["teal", "orange", "green", "pink"];

  React.useEffect(() => {
    setLoading(true);
    const fetchFunction = async () => {
      console.log(user.id, "userid");
      const data = await client(
        `query MyQuery2 {
  challenges {
    id
    name
    end_time
    prize
    start_time
    type
  }
}
`,
        {}
      );
      setData(data.data.challenges);
      setLoading(false);
    };
    try {
      fetchFunction();
    } catch (e) {
      console.error("error", e);
    }
  }, [user.id]);

  const carouselRef = React.createRef();

  const renderItem = ({ item, index }) => {
    return (
      <Card
        elevation={4}
        style={{
          backgroundColor: colors[index],
          borderRadius: 12,
          height: 200,
          width: 175,
          padding: 8,
          marginLeft: 8,
          marginRight: 8,
        }}
      >
        <Text>{item.name}</Text>
        <Text>
          Czas trwania:{format(new Date(item.start_time), "dd.MM.yyyy HH:mm")}
        </Text>
        <View style={{ width: 150 }}>
          <Text>Typ: {item.type}</Text>
          <Text>Nagroda: {item.prize}</Text>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 80,
          justifyContent: "center",
          marginLeft: 16,
          marginBottom: 20,
        }}
      >
        <Headline>Dostępne wydarzenia</Headline>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : data ? (
        <View style={{ height: 300 }}>
          <Carousel
            layout={"default"}
            ref={carouselRef}
            data={data}
            firstItem={1}
            sliderWidth={400}
            itemWidth={175}
            renderItem={renderItem}
            onSnapToItem={(index) => setIndex(index)}
          />
        </View>
      ) : null}
      {/* <View
        style={{
          marginTop: 80,
          justifyContent: "center",
          marginLeft: 16,
          marginBottom: 20,
        }}
      >
        <Headline>Statystyki</Headline>
      </View> */}
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

export { Menu };
