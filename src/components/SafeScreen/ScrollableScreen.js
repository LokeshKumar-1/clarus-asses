import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const ScrollableScreen = ({
  children,
  addedStyles,
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
        style={styles.container}
        refreshControl={
          includePageRefresh && (
            <RefreshControl
              colors={[Colors.primary, Colors.black]}
              tintColor={Colors.primary}
              refreshing={refreshingStatus}
              onRefresh={onRefresh}
            />
          )
        }
        contentContainerStyle={[
          styles.container,
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
    flexGrow: 1,
  },
});

export default ScrollableScreen;
