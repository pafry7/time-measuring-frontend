import * as React from "react";
import { AuthProvider } from "./src/context/auth-context";
import { StatusBar } from "expo-status-bar";
import { Router } from "./src/navigation";
import { AppLoading } from "expo";
import { Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { theme } from "./src/common/theme";
import { LocationProvider } from "./src/context/location-context.js";

export default function App() {
  const [loaded] = useFonts({
    "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
    "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
    "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <LocationProvider>
        <PaperProvider theme={theme}>
          <Router />
          <StatusBar style="dark" />
        </PaperProvider>
      </LocationProvider>
    </AuthProvider>
  );
}
