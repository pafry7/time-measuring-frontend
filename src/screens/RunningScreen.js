import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { Modal, Portal, Provider } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Polyline } from "react-native-maps";
import { Headline, Button, Title } from "react-native-paper";
import { useLocation } from "../context/location-context";
import { client } from "../utils/requests";
import { formatISO } from "date-fns";

const RunningScreen = ({ navigation, route }) => {
  const { currentLocation, subscribe } = useLocation();
  const [region, setRegion] = React.useState(null);
  const [locations, setLocations] = React.useState([]);
  const [seconds, setSeconds] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  const [test, setTest] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const { activityId } = route.params;
  const mapRef = React.createRef();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: "50%",
    height: "20%",
    marginLeft: 90,
  };

  const callback = async (data) => {
    const { latitude, longitude } = data.coords;
    console.log(latitude, longitude);
    setRegion({ latitude, longitude });
    setLocations((loc) => [...loc, { latitude, longitude }]);
    try {
      const response = await client(`activities/${activityId}/location`, {
        body: {
          latitude: latitude,
          longitude: longitude,
          timestamp: formatISO(new Date()),
        },
      });
      console.log("post locations to activity response", response);
      if (response.expect_photo) {
        showModal();
      }
    } catch (e) {
      console.log("errorrr", e);
    }
  };
  React.useEffect(() => {
    const wrap = async () => {
      const options = {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
      };
      const location = await Location.watchPositionAsync(options, callback);
      setTest(location);
    };
    wrap();

    if (test) {
      return test.remove;
    }
  }, [activityId]);
  React.useEffect(() => {
    let distance = 0;
    let recentParams = {
      latitude: locations[0] && locations[0].latitude,
      longitude: locations[0] && locations[0].longitude,
    };
    const KmInDegree = 111;

    for (const location of locations) {
      const step = Math.sqrt(
        Math.pow(
          Math.abs(location.latitude - recentParams.latitude) * KmInDegree,
          2
        ) +
          Math.pow(
            Math.abs(location.longitude - recentParams.longitude) * KmInDegree,
            2
          )
      );
      recentParams = {
        ...location,
      };
      distance += step;
    }
    setDistance(distance);
  }, [locations]);

  const { height, width } = Dimensions.get("window");
  const latitude_delta = 0.005;
  const longitude_delta = latitude_delta * (width / height);
  React.useEffect(() => {
    console.log(region, "pos");
    if (region) {
      mapRef.current.animateToRegion({
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: latitude_delta * (width / height),
      });
    }
  }, [region]);

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
          <Headline style={{ fontSize: 36, paddingTop: 20 }}>
            {distance.toFixed(2)} km
          </Headline>
        </View>
      </View>
      <View
        style={{
          height: 125,
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          onPress={async () => {
            await test.remove();

            const URL =
              "https://us-central1-timemeasuring-b8740.cloudfunctions.net/app";
            try {
              await fetch(`${URL}/activities/${activityId}/final`, {
                method: "POST",
              });
            } catch (e) {
              console.error(e, "here");
            }
            navigation.push("RunSummary", { activityId, distance, seconds });
          }}
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
          showsUserLocation
          style={styles.mapStyle}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: latitude_delta,
            longitudeDelta: longitude_delta,
          }}
        ></MapView>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[200, 100]}
        borderRadius={24}
        renderContent={renderContent}
      />
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text>Jeteś obok punktu orientacyjnego! Zrób selfie!</Text>
            <Button style={{ marginBottom: 8 }} mode="contained">
              Aparat
            </Button>
          </Modal>
        </Portal>
      </Provider>
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
