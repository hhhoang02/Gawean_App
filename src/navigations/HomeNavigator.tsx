import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ShopDetail from '../screens/HomeScreen/ShopDetail';
import CategoryDetail from '../screens/HomeScreen/CategoryDetail';
import ProductDetail from '../screens/HomeScreen/ProductDetail';
import OfferDetail from '../screens/HomeScreen/OfferDetail';
const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ShopDetail" component={ShopDetail} />
            <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="OfferDetail" component={OfferDetail} />
          </Stack.Navigator>
      );
}

export default HomeNavigator

const styles = StyleSheet.create({})