import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigation';
import * as SplashScreenAPI from 'expo-splash-screen';
import { CartProvider } from './src/Context/CartContext';
import Toast from 'react-native-toast-message';
import { createTable } from './src/database/schema/schema';
import { Provider as PaperProvider } from 'react-native-paper';


//SplashScreenAPI.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    createTable().then(() => console.log('Table created or already exists'));
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <CartProvider>
          <RootNavigator />
          <Toast />
        </CartProvider>
      </NavigationContainer>
    </PaperProvider>

  );
}
