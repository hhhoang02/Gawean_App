import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FooterComponent = () => {
    return (
        <View style={styles.footer}>
          <Text style={styles.text}>© 2024 My App</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      footer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#f0f0f0',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
      text: {
        fontSize: 14,
        color: '#333',
      },
    });
    
    export default FooterComponent;