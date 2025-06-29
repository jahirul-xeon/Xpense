import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigation';
import * as SplashScreenAPI from 'expo-splash-screen';
import { CartProvider } from './src/Context/CartContext';
import Toast from 'react-native-toast-message';
import { setupDatabase } from './src/database/schema/schema';

//SplashScreenAPI.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    setupDatabase();
  }, []);
  return (
    <NavigationContainer>
      <CartProvider>
        <RootNavigator />
        <Toast />
      </CartProvider>
    </NavigationContainer>
  );
}
