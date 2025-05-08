import { StyleSheet, Text, View } from "react-native";
import SafeScreen from "../SafeScreen/SafeScreen";

const NetworkErrorScreen = () => {
  return (
    <SafeScreen backgroundColor="#fff">
      <View style={styles.container}>
        <Text style={styles.ConnectionPara}>No connection</Text>
        <Text style={styles.InternetPara}>Internet not available</Text>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  ConnectionPara: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 36,
    color: "#0F172A",
  },
  InternetPara: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: "#334155",
  },
});

export default NetworkErrorScreen;
