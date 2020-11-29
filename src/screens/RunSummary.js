import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
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

  const locations = [
    {
      latitude: 49.99994424,
      longitude: 19.85303718,
    },
    {
      latitude: 50.0127486,
      longitude: 19.8809946,
    },
    {
      latitude: 50.00034582,
      longitude: 19.8528092,
    },
    {
      latitude: 50.0127494,
      longitude: 19.8810024,
    },
    {
      latitude: 50.00075801,
      longitude: 19.85259035,
    },
    {
      latitude: 50.00120104,
      longitude: 19.85240343,
    },
    {
      latitude: 50.01276,
      longitude: 19.8809991,
    },
    {
      latitude: 50.00153892,
      longitude: 19.85230706,
    },
    {
      latitude: 50.00160681,
      longitude: 19.8522877,
    },
    {
      latitude: 50.0127639,
      longitude: 19.8809999,
    },
    {
      latitude: 50.0127697,
      longitude: 19.8809989,
    },
    {
      latitude: 50.00186088,
      longitude: 19.85222435,
    },
    {
      latitude: 50.00192049,
      longitude: 19.85221208,
    },
    {
      latitude: 50.00199563,
      longitude: 19.85219661,
    },
    {
      latitude: 50.00204516,
      longitude: 19.85218641,
    },
    {
      latitude: 50.0127685,
      longitude: 19.8809856,
    },
    {
      latitude: 50.0127685,
      longitude: 19.8809856,
    },
    {
      latitude: 50.0127667,
      longitude: 19.8809973,
    },
    {
      latitude: 50.0127667,
      longitude: 19.8809973,
    },
    {
      latitude: 50.00225548,
      longitude: 19.85213698,
    },
    {
      latitude: 50.00225548,
      longitude: 19.85213698,
    },
  ];

  const latitude_delta = 0.01;
  const longitude_delta = latitude_delta * (width / height);
  const { activityId } = route.params;
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
      console.log(data);
      setLoading(false);
    };
    try {
      fetchFunction();
    } catch (e) {
      console.error("error", e);
    } finally {
    }
  }, [activityId]);
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
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              marginBottom: 20,
              marginTop: 30,
            }}
          >
            <Text>Dystans: 20km</Text>
            <Text>Czas: 2:05 h</Text>
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
