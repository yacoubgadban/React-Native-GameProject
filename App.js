import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Navigation} from './src/navigation/nav.js';
import { LogBox } from 'react-native';



 
export default function App() {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
  return (
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
  );
}

