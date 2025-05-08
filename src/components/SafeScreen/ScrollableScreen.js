import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import colors from "../../utils/colors";

const ScrollableScreen = ({
  children,
  addedStyles = {},
  scrollable = true,
  includePageRefresh = false,
  refreshingStatus = false,
  isHorizontalScroll = false,
  onRefresh = () => {},
}) => {
  const tabBarheight = useBottomTabBarHeight();

  if (scrollable) {
    return (
      <ScrollView
        nestedScrollEnabled={true}
        horizontal={isHorizontalScroll}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        refreshControl={
          includePageRefresh && (
            <RefreshControl
              colors={[colors.primary, colors.black]}
              tintColor={colors.primary}
              refreshing={refreshingStatus}
              onRefresh={onRefresh}
            />
          )
        }
        contentContainerStyle={[
          styles.scrollContentContainer,
          { paddingBottom: tabBarheight + 20 },
          addedStyles,
        ]}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.container, addedStyles]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
});

export default ScrollableScreen;
