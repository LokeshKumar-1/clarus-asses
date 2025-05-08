import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./mainStack";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
