import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button, useTheme, Headline } from "react-native-paper";
import MapView from "react-native-maps";

const RunSummary = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, seLoading] = React.useState(2);
  const [region, setRegion] = React.useState({
    latitude: 50.071904,
    longitude: 19.941856,
  });
  const { height, width } = Dimensions.get("window");

  const latitude_delta = 0.01;
  const longitude_delta = latitude_delta * (width / height);

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
          <Button
            mode="contained"
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
