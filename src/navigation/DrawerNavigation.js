import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsScreen from "../screens/SettingsScreen";
import SidebarScreen from "../components/SidebarScreen";
import TabNavigation from "./TabNavigation";

import { fitnessMappingHeaderOptions, hideHeaderOptions, MainHomeHeaderOptions, WorkoutPlansHeaderOptions } from './NavigationOptions';
const Drawer = createDrawerNavigator();
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "../screens/dashboard/Dashboard";
import CustomHeader from "../components/CustomHeader";
const Stack = createNativeStackNavigator();
// Stack for Diet Plan Flow
function DietPlanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={fitnessMappingHeaderOptions} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={fitnessMappingHeaderOptions} />
    </Stack.Navigator>
  );
}

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home"
      screenOptions={{
        gestureEnabled: false,
        drawerStyle: {
          width: '85%',
        },
      }}
      drawerContent={(props) => <SidebarScreen {...props} />}>
      <Drawer.Screen name="Home" component={Dashboard} options={({ navigation }) => ({
        header: () => (
          <CustomHeader
            navigation={navigation}
            title="Core Student App"
            showNotification={false}
          />
        ),
      })} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Home1" component={SettingsScreen} options={fitnessMappingHeaderOptions} />
      <Drawer.Screen name="Home2" component={DietPlanStack} options={fitnessMappingHeaderOptions} />
    </Drawer.Navigator>
  );
}
