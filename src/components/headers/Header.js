import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const Header = ({
  showBackBtn = true,
  backgroundColor,
  IconComponent = MaterialIcons,
  backIconName = "arrow-back-ios",
  backIconSize = 24,
  backBtnColor = "#475569",
  headerTitle = null,
  centeredTitle = null,
  headerTitleStyles = {},
  centeredTitleStyles = {},
  onBackPress = () => {},
}) => {
  const navigation = useNavigation();

  const handleBackBtnEvent = () => {
    onBackPress();
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          height: !showBackBtn ? 45 : null,
        },
      ]}
    >
      {showBackBtn && (
        <Pressable
          style={[
            styles.titleAndBackBtn,
            { width: headerTitle ? null : "20%" },
          ]}
          onPress={handleBackBtnEvent}
        >
          <IconComponent
            name={backIconName}
            size={backIconSize}
            color={backBtnColor}
            style={{ marginTop: Platform.OS === "ios" ? 0 : 3 }}
          />
          {headerTitle && (
            <Text style={[styles.title, headerTitleStyles]}>{headerTitle}</Text>
          )}
        </Pressable>
      )}
      {centeredTitle && (
        <Text style={[styles.title, centeredTitleStyles]}>{centeredTitle}</Text>
      )}

      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E2E8F0",
    paddingRight: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleAndBackBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingVertical: 10,
  },

  title: {
    fontSize: 15,
    marginLeft: 10,
    color: "#334155",
    fontFamily: "familyMedium",
    fontWeight: 510,
  },

  rightAreaBtnCont: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  rightAreaBtnItem: {
    height: "100%",
  },
  textBtnName: {
    color: "#1E293B",
    fontFamily: "familyMedium",
    fontSize: 13,
  },
});

export default Header;
