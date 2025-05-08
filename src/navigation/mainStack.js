import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import { Platform, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import HomeStack from "./stacks/HomeStack";
import Octicons from "@expo/vector-icons/Octicons";
import colors from "../utils/colors";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const MainStack = () => {
  const shouldTabBarBeVisible = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "dashboard";
    return routeName === "dashboard";
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: shouldTabBarBeVisible(route)
          ? {
              position: "absolute",
              backgroundColor: "transparent",
              height: "fitContent",
            }
          : { display: "none" },

        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              tint="light"
              intensity={50}
              style={StyleSheet.absoluteFill}
            />
          ) : (
            <View
              style={[StyleSheet.absoluteFill, { backgroundColor: "white" }]}
            />
          ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Octicons name="home" size={18} color={colors.primary} />
          ),
          tabBarActiveTintColor: colors.primary,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainStack;
