import React from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { colors, ThemeProvider } from "react-native-elements";
import { Create } from "./components";

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios
    })
  }
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Create />
    </ThemeProvider>
  );
}
