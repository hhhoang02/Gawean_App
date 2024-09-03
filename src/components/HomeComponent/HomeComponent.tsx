import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

const HomeComponent = () => {
    return (
        <View>
          <HeaderComponent />
          <FooterComponent/>
        </View>
      );
    };
    
    export default HomeComponent;