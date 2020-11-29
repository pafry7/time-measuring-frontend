import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useContext, useEffect } from "react";

const LocationContext = React.createContext();

const LocationProvider = (props) => {
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [error, setError] = React.useState(null);
  console.log("I am in location provider", currentLocation);

  const subscribe = async (callback) => {
    const options = {
      accuracy: Location.Accuracy.High,
      timeInterval: 10000,
    };
    const remove = await Location.watchPositionAsync(options, callback);
    return remove;
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== "granted") {
        setError(new Error("Permission to access location was denied"));
      } else {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setCurrentLocation({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });
      }
    };
    fetchUserLocation();
  }, []);
  return (
    <LocationContext.Provider
      value={{ error, currentLocation, subscribe }}
      {...props}
    />
  );
};

const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { useLocation, LocationProvider };
