import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Fab } from "../components/Fab";
import Carousel from "react-native-snap-carousel";
import { Headline, Card, Title, ActivityIndicator } from "react-native-paper";
import { useAuth } from "../context/auth-context";
import { client } from "../utils/client";

const Menu = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(2);
  const { user } = useAuth();

  // React.useEffect(() => {
  //   setLoading(true);
  //   const fetchFunction = async () => {
  //     console.log(user.id, "userid");
  //     const data = await client(`users/${user.id}/challenges`);
  //     console.log(data);
  //     setData(data);
  //   };
  //   try {
  //     fetchFunction();
  //   } catch (e) {
  //     console.error("error", e);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  console.log(index);
  const [items, setItems] = React.useState([
    {
      title: "Item 1",
      text: "Text 1",
      color: "red",
    },
    {
      title: "Item 2",
      text: "Text 2",
      color: "blue",
    },
    {
      title: "Item 3",
      text: "Text 3",
      color: "white",
    },
    {
      title: "Item 4",
      text: "Text 4",
      color: "green",
    },
    {
      title: "Item 5",
      text: "Text 5",
      color: "pink",
    },
  ]);

  const carouselRef = React.createRef();

  const { height, width } = Dimensions.get("window");

  const renderItem = ({ item, index }) => {
    return (
      <Card
        elevation={5}
        style={{
          backgroundColor: item.color,
          borderRadius: 12,
          height: 200,
          width: 175,
          padding: 50,
          marginLeft: 8,
          marginRight: 8,
        }}
      >
        <Text>{item.title}</Text>
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
            data={items}
            firstItem={2}
            sliderWidth={400}
            itemWidth={175}
            renderItem={renderItem}
            onSnapToItem={(index) => setIndex(index)}
          />
        </View>
      ) : null}
      <View
        style={{
          marginTop: 80,
          justifyContent: "center",
          marginLeft: 16,
          marginBottom: 20,
        }}
      >
        <Headline>Statystyki</Headline>
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

export { Menu };
