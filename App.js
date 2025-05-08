import { useNetInfo } from "@react-native-community/netinfo";
import NetworkErrorScreen from "./src/components/networkErrorScreen/NetworkErrorScreen";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  const netInfo = useNetInfo();

  return netInfo.isConnected && netInfo.isInternetReachable ? (
    <AppNavigator />
  ) : netInfo.isInternetReachable === null ? null : (
    <NetworkErrorScreen />
  );
};

export default App;
