import { ActivityIndicator, StyleSheet, View } from "react-native";
import colors from "../../utils/colors";

const Loader = () => {
  return (
    <View style={styles.loaderCont}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
