import { configureFonts, DefaultTheme } from "react-native-paper";

const fontConfig = {
  default: {
    regular: {
      fontFamily: "SFProDisplay-Bold",
    },
    medium: {
      fontFamily: "SFProDisplay-Semibold",
    },
    light: {
      fontFamily: "SFProDisplay-Regular",
    },
    thin: {
      fontFamily: "SFProDisplay-Medium",
    },
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4F459C",
    secondary: "#6FCBC6",
  },
  fonts: configureFonts(fontConfig),
};

export { theme };
