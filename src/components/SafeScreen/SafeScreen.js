import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

const SafeScreen = ({
  children,
  addedStyles,
  backgroundColor = "#fff",
  statusBarBackgroundColor = "#fff",
  barStyle = "dark-content",
  isHidden = false,
}) => {
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor }]}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={statusBarBackgroundColor}
        hidden={isHidden}
      />
      <View style={[styles.content, addedStyles]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default SafeScreen;
