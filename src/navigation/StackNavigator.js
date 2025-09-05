// src/navigation/StackNavigators.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/SettingsScreen';
import {
  BrowseHeaderOptions,
  ChatPageHeaderOptions,
  HomeHeaderOptions,
  MainHomeHeaderOptions,
  MyAccountPageHeaderOptions,
  PostPropertyProfileHeaderOptions,
  PremiumPostHeaderOptions,
  TaskDetailsHeaderOptions,
} from './NavigationOptions';

import Dashboard from '../screens/dashboard/Dashboard';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const HomeStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();

export function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Dashboard}
        options={MainHomeHeaderOptions}
      />
    </HomeStack.Navigator>
  );
}


export function AccountStackNavigator() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="Account"
        component={ProfileScreen}
        options={MyAccountPageHeaderOptions}
      />
      {/* Add more screens here */}
    </AccountStack.Navigator>
  );
}
