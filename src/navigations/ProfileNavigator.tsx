import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import OrderHistoryScreen from '../screens/ProfileScreen/OrderHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SettingScreen from '../screens/ProfileScreen/SettingScreen';
import SaveAddressScreen from '../screens/ProfileScreen/SaveAddressScreen';
import PaymentMethodScreen from '../screens/ProfileScreen/PaymentMethodScreen';
import AddPaymentMethodScreen from '../screens/ProfileScreen/AddPaymentMethodScreen';
import BankDetailScreen from '../screens/ProfileScreen/BankDetailScreen';
const Stack = createStackNavigator();

const ProfileNavigator = () => {
    return (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="SaveAddress" component={SaveAddressScreen} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
            <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
            <Stack.Screen name="BankDetail" component={BankDetailScreen} />
          </Stack.Navigator>
      );
}

export default ProfileNavigator

const styles = StyleSheet.create({})