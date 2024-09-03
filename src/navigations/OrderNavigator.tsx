import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import OrderScreen from "../screens/OrderScreen/OrderScreen";
import PaymentScreen from "../screens/PaymentScreen/PaymentScreen";

const Stack = createStackNavigator();

const OrderNavigator = () => {
    return (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          </Stack.Navigator>
      );
}

export default OrderNavigator

const styles = StyleSheet.create({})