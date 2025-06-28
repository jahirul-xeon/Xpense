import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Daily from '../screens/UpperTab/Daily';
import Calendar from '../screens/UpperTab/Calendar';
import Monthly from '../screens/UpperTab/Monthly';
import Summary from '../screens/UpperTab/Summary';
import Description from '../screens/UpperTab/Description';
import { ScreenName } from '../constants/screen.data';

const Tab = createMaterialTopTabNavigator();

export default function UpperTab() {
  const { width } = useWindowDimensions();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: false,
        tabBarStyle: {
          backgroundColor: '#53B175',
          width: width,
        },
        tabBarLabelStyle: {
          fontSize: width < 360 ? 12 : 14,
          textTransform: 'none',
          textAlign: 'center',
        },
        tabBarItemStyle: {
          width: width / 5,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'white',
          height: 2,
          paddingHorizontal: 0,
          marginHorizontal: 0,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',
      }}
    >
      <Tab.Screen name={ScreenName.DAILY_TAB} component={Daily} options={{
        tabBarLabelStyle: { paddingHorizontal: 0 },
      }} />
      <Tab.Screen name={ScreenName.CALENDAR_TAB} component={Calendar} />
      <Tab.Screen name={ScreenName.MONTHLY_TAB} component={Monthly} />
      <Tab.Screen name={ScreenName.SUMMARY_TAB} component={Summary} />
      <Tab.Screen name={ScreenName.DESCRIPTION_TAB} component={Description} />
    </Tab.Navigator>
  );
}
