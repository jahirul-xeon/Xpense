import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from '../constants/screen.data';
import { LandingPage, Splash } from '../screens';
import BottomTabs from './BottomTab';
import UpperTab from './UpperTab';
import InsertPage from '../screens/InsertPage';
import { TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName={ScreenName.SPLASH_Screen} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ScreenName.SPLASH_Screen} component={Splash} />
            <Stack.Screen
                name={ScreenName.UPPER_TAB}
                children={props => (
                    <UpperTab {...props} selectedDate={new Date()} />
                )}
            />
            <Stack.Screen name={ScreenName.BOTTOM_TAB} component={BottomTabs} />
            <Stack.Screen
                name={ScreenName.INSERT_PAGE}
                component={InsertPage}
                options={{
                    headerShown: true, title: 'Insert Data',
                    headerBackground: () => <View style={{ backgroundColor: '#53B175', flex: 1 }} />,
                    headerRight: () => (<TouchableOpacity >
                        <AntDesign name="staro" size={24} color="white" />
                    </TouchableOpacity>),
                    headerTitleStyle: { color: 'white' }, 
                    headerTintColor: 'white'
                }}
            />

        </Stack.Navigator>
    );
}
