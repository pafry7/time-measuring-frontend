import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import BottomSheet from "reanimated-bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Headline, Button, Title } from "react-native-paper";
import { useLocation } from "../context/location-context";

const RunningScreen = ({ navigation }) => {
  const [seconds, setSeconds] = React.useState(0);
  const [region, setRegion] = React.useState({
    latitude: 50.071904,
    longitude: 19.941856,
  });
  const { currentLocation } = useLocation();

  const { height, width } = Dimensions.get("window");
  const latitude_delta = 0.005;

  const mapRef = React.createRef();
  const longitude_delta = latitude_delta * (width / height);
  React.useEffect(() => {
    console.log(region, "pos");
    if (currentLocation) {
      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
      mapRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: latitude_delta * (width / height),
      });
    }
  }, [currentLocation]);

  function secondsToString(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor((seconds % 3600) % 60);

    const hoursDisplay = hours > 0 ? `${hours}:` : "";
    const minutesDisplay = minutes > 0 ? `${minutes}:` : "";
    const secondsDisplay = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

    return `${hoursDisplay}${minutesDisplay}${secondsDisplay}`;
  }

  React.useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 250,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="clock-outline"
            size={32}
            color="orange"
            style={{ paddingTop: 10, marginRight: 8 }}
          />
          <Headline
            style={{
              fontSize: 36,
              width: seconds < 60 ? 50 : 80,
              paddingTop: 20,
              marginRight: 4,
              borderWidth: 1,
            }}
          >
            {secondsToString(seconds)}
          </Headline>
          <Title
            style={{
              fontSize: 24,
              paddingTop: 20,
              color: "gray",
            }}
          >
            {seconds < 60 ? "s" : "min"}
          </Title>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="chart-timeline-variant"
            color="green"
            size={32}
            style={{ paddingTop: 10, marginRight: 8 }}
          />
          <Headline style={{ fontSize: 36, paddingTop: 20 }}>23 km</Headline>
        </View>
      </View>
      <View
        style={{
          height: 125,
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          {/* <MaterialCommunityIcons
            name="speedometer"
            size={36}
            color="orange"
            style={{ marginBottom: 4 }}
          /> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 50,
            }}
          >
            <Text style={{ marginBottom: 2, fontSize: 18 }}>23</Text>
            <Text style={{ color: "gray" }}>km/h</Text>
          </View>
        </View>
        <Button
          onPress={() => console.log("xD")}
          mode="contained"
          color="red"
          contentStyle={{ height: 50 }}
        >
          Zakończ
        </Button>
      </View>
    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.mapStyle}
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: latitude_delta,
            longitudeDelta: longitude_delta,
          }}
        ></MapView>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[250, 100]}
        borderRadius={24}
        renderContent={renderContent}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export { RunningScreen };
