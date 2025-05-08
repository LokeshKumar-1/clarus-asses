import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../../screens/Dashboard";
import AboutProduct from "../../screens/AboutProduct";
import AddAndEdit from "../../screens/AddAndEdit";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen name="aboutProduct" component={AboutProduct} />
      <Stack.Screen name="AddAndEdit" component={AddAndEdit} />
    </Stack.Navigator>
  );
};

export default HomeStack;
