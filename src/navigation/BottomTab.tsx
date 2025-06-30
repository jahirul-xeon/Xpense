import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome5, MaterialCommunityIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import AccountTab from '../screens/Tab/MoreTab';
import ExploreTab from '../screens/Tab/StatsTab';
import FavouriteTab from '../screens/Tab/AccountsTab';
import mainScreen from '../screens/Tab/mainScreen';
import { ScreenName } from '../constants/screen.data';

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color="#55847A", size }) => {
                switch (route.name) {
                    case ScreenName.MAIN_TAB:
                        return <SimpleLineIcons name="notebook" size={24} color={color} />;
                    case ScreenName.STATS_TAB:
                        return <AntDesign name="linechart" size={24} color={color} />;
                    case ScreenName.ACCOUNTS_TAB:
                        return <Octicons name="database" size={24} color={color} />;
                    case ScreenName.MORE_TAB:
                        return <MaterialCommunityIcons name="dots-horizontal" size={24} color={color} />
                    default:
                        return <FontAwesome5 name="question" size={size} color={color} />;
                }
            },
            tabBarActiveTintColor: '#55847A',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {},
        })}
    >
        <Tab.Screen name={ScreenName.MAIN_TAB} component={mainScreen} />
        <Tab.Screen name={ScreenName.STATS_TAB} component={ExploreTab} />
        {/* <Tab.Screen name={ScreenName.FAVOURITE_TAB} component={FavouriteTab} /> */}
        <Tab.Screen
            name={ScreenName.ACCOUNTS_TAB} component={() => <FavouriteTab />}
        />
        <Tab.Screen name={ScreenName.MORE_TAB} component={AccountTab} />
    </Tab.Navigator>
);

export default BottomTabs;
