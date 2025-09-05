import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  HomeStackNavigator,
  AccountStackNavigator,
} from './StackNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Profile') iconName = 'person-circle';
          return <Ionicons name={iconName} size={20} color={focused ? '#42a5f5' : 'lightgray'} />;
        },
        tabBarActiveTintColor: '#42a5f5',
        tabBarInactiveTintColor: 'lightgray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Profile" component={AccountStackNavigator} />
    </Tab.Navigator>
  );
}
