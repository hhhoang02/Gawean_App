  import 'react-native-gesture-handler';

import React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import AuthNavigator from './src/navigations/AuthNavigator';

function App(): JSX.Element {
  
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default App;
