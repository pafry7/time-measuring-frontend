import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Polyline } from "react-native-maps";
import { Headline, Button, Title } from "react-native-paper";
import { useLocation } from "../context/location-context";
import { client } from "../utils/requests";
import { formatISO } from "date-fns";

const RunningScreen = ({ navigation, route }) => {
  const [visible, setVisible] = React.useState(false);

  const { currentLocation, subscribe } = useLocation();
  const [seconds, setSeconds] = React.useState(0);
  const [test, setTest] = React.useState(null);
  const [locations, setLocations] = React.useState([]);
  // console.log(locations);
  const [region, setRegion] = React.useState({
    latitude: 50,
    longitude: 19,
  });
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
    console.log(locations);

    try {
      // const response = await client(`activities/${activityId}/location`, {
      //   body: {
      //     latitude: latitude,
      //     longitude: longitude,
      //     timestamp: formatISO(new Date()),
      //   },
      // });
      // console.log(response);
    } catch (e) {
      // console.log("errorrr", e);
    }
  };
  React.useEffect(() => {
    let object;
    const wrap = async () => {
      object = await subscribe(callback);
      try {
        // const response = await client(`activities/${activityId}/location`, {
        //   body: {
        //     latitude: currentLocation.latitude,
        //     longitude: currentLocation.longitude,
        //     timestamp: formatISO(new Date()),
        //   },
        // });
        // console.log(response);
      } catch (err) {
        console.error(err);
      }
      setTest(object);
    };
    wrap();
  }, [activityId]);

  const { height, width } = Dimensions.get("window");
  const latitude_delta = 0.005;

  const longitude_delta = latitude_delta * (width / height);
  // React.useEffect(() => {
  //   console.log(region, "pos");
  //   if (region && mapRef.current) {
  //     // setRegion({
  //     //   latitude: currentLocation.latitude,
  //     //   longitude: currentLocation.longitude,
  //     // });
  //     mapRef.current.animateToRegion({
  //       latitude: region.latitude,
  //       longitude: region.longitude,
  //       latitudeDelta: 0.005,
  //       longitudeDelta: latitude_delta * (width / height),
  //     });
  //   };
  // }, [region])

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
          <Headline style={{ fontSize: 36, paddingTop: 20 }}>1 km</Headline>
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
            showModal();
            // test.remove();
            // try {
            //   const response = await client(`activities/${activityId}/final`, {
            //     body: { test: "body" },
            //   });
            //   console.log(response);
            // } catch (e) {
            //   console.error(e);
            // }
            navigation.push("RunSummary", { activityId });
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
            latitude: region.latitude,
            longitude: region.longitude,
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
        {/* <Button style={{ marginTop: 30 }} onPress={showModal}>
          Show
        </Button> */}
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
