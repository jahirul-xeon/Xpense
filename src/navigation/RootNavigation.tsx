import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from '../constants/screen.data';
import { LandingPage, Splash} from '../screens';
import BottomTabs from './BottomTab';
import UpperTab from './UpperTab';



const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName={ScreenName.SPLASH_Screen} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ScreenName.SPLASH_Screen} component={Splash} />
            <Stack.Screen name={ScreenName.UPPER_TAB} component={UpperTab} />
            <Stack.Screen name={ScreenName.BOTTOM_TAB} component={BottomTabs}/>

        </Stack.Navigator>
    );
}
