import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Mainscreen from "./RegisterScreen/Mainscreen"; // Doğru import
import Register from "./RegisterScreen/register";     // Doğru import
import ObjectDetectorScreen from "./RegisterScreen/ObjectDetectorScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Mainscreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ObjectDetectorScreen" component={ObjectDetectorScreen} />
        <Stack.Screen name="Mainscreen" component={Mainscreen} />
        <Stack.Screen name="register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
