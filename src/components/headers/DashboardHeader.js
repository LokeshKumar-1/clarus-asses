import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../utils/colors";

const DashboardHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => navigation.navigate("dashboard")}>
        <Image
          resizeMode="contain"
          source={require("../../../assets/dashboard/logo.png")}
          style={styles.logoImage}
        />
      </Pressable>
      <Pressable
        style={styles.addProductBtn}
        onPress={() =>
          navigation.navigate("AddAndEdit", { purposeForVisit: "add" })
        }
      >
        <Text style={{ fontSize: 14, color: colors.white }}>Add</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 9,
    paddingHorizontal: 16,
    position: "fixed",
    top: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  profileBtn: {
    borderRadius: 50,
    height: 36,
    width: 36,
    backgroundColor: "#E3D7EA",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    color: "#782E92",
    fontSize: 15,
    fontFamily: "familyBold",
    fontWeight: "700",
  },
  logoImage: {
    height: 30,
    width: 40,
  },
  addProductBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 4,
  },
});

export default DashboardHeader;
