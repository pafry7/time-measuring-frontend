import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Button,
  useTheme,
  Headline,
  ActivityIndicator,
} from "react-native-paper";
import MapView, { Polyline } from "react-native-maps";
import { client } from "../utils/client";

const RunSummary = ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, seLoading] = React.useState(2);
  const [region, setRegion] = React.useState({
    latitude: 50.071904,
    longitude: 19.941856,
  });
  const { height, width } = Dimensions.get("window");

  const latitude_delta = 0.01;
  const longitude_delta = latitude_delta * (width / height);
  const { activityId, seconds, distance } = route.params;
  React.useEffect(() => {
    setLoading(true);
    const fetchFunction = async () => {
      const data = await client(
        `query MyQuery2($id: uuid){
  activities(where: {id: {_eq: $id}}) {
    distance
    id
    locations
  }
}
`,
        { id: activityId }
      );
      // setData(data.data.users[0].activities);
      console.log("info about recent activity", data);
      setLoading(false);
    };
    try {
      fetchFunction();
    } catch (e) {
      console.error("error", e);
    } finally {
    }
  }, [activityId]);
  function secondsToString(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor((seconds % 3600) % 60);

    const hoursDisplay = hours > 0 ? `${hours}:` : "";
    const minutesDisplay = minutes > 0 ? `${minutes}:` : "";
    const secondsDisplay = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

    return `${hoursDisplay}${minutesDisplay}${secondsDisplay}`;
  }
  const mapRef = React.useRef();
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 80,
          marginLeft: 16,
          marginBottom: 20,
        }}
      >
        <Headline>Podsumowanie</Headline>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : data ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <MapView
            ref={mapRef}
            style={{
              width: Dimensions.get("window").width * 0.9,
              height: Dimensions.get("window").height * 0.4,
              // borderWidth: 1,
              borderRadius: 16,
            }}
            initialRegion={{
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: latitude_delta,
              longitudeDelta: longitude_delta,
            }}
          ></MapView>
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: 300,
              marginBottom: 20,
              marginTop: 30,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={24}
                color="black"
              />
              <Headline style={{ marginLeft: 8 }}>
                Czas: {secondsToString(seconds)}
                {seconds < 60 ? "s" : "min"}
              </Headline>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="chart-timeline-variant"
                size={24}
                color="black"
              />
              <Headline style={{ marginLeft: 8 }}>
                Dystans: {distance.toFixed(2)} km
              </Headline>
            </View>
          </View>
          <Button
            mode="contained"
            style={{ matginTop: 10 }}
            onPress={() => navigation.push("Home", { screen: "Menu" })}
          >
            Wróc do menu
          </Button>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
});

export { RunSummary };
