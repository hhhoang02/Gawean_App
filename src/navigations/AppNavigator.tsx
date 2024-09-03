import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialBottomTabNavigationOptions } from '@react-navigation/material-bottom-tabs';
import ExploreScreen from '../screens/ExploreScreen/ExploreScreen';
import DrivethruScreen from '../screens/DrivethruScreen/DrivethruScreen';
import OrderScreen from '../screens/OrderScreen/OrderScreen';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import OrderNavigator from './OrderNavigator';

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => {
  return (
      <Tab.Navigator
      initialRouteName="HomeNavigator"
      labeled={false} // Tắt nhãn\
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName:any;
          if (route.name === 'HomeNavigator') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'globe-sharp' : 'globe-outline';
          } else if (route.name === 'Drivethru') {
            iconName = focused ? 'car-sharp' : 'car-outline';
          } else if (route.name === 'OrderNavigator') {
            iconName = focused ? 'cart-sharp' : 'cart-outline';
          } else if (route.name === 'ProfileNavigator') {
            iconName = focused ? 'person-sharp' : 'person-outline';
          }

          return (<Icon name={iconName} size={22} color={'black'} />
          );
        },
      })}
      >
        <Tab.Screen 
          name="HomeNavigator" 
          component={HomeNavigator}
        />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Drivethru" component={DrivethruScreen} />
        <Tab.Screen name="OrderNavigator" component={OrderNavigator} />
        <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: 'white', 
  },
  iconContainer: {
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerFocused: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0edf6',
    borderRadius: 25,
    width: 40,
    height: 40,
  },
});

export default AppNavigator;