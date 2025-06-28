import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigation';
import * as SplashScreenAPI from 'expo-splash-screen';
import { CartProvider } from './src/Context/CartContext';
import Toast from 'react-native-toast-message';

//SplashScreenAPI.preventAutoHideAsync();

export default function App() {
  return (
    <NavigationContainer>
      <CartProvider>
        <RootNavigator />
        <Toast />
      </CartProvider>
    </NavigationContainer>
  );
}
