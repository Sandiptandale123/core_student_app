import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SidebarScreen from "../components/SidebarScreen";
const Drawer = createDrawerNavigator();
import Dashboard from "../screens/dashboard/Dashboard";
import CustomHeader from "../components/CustomHeader";

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home"
      screenOptions={{
        gestureEnabled: false,
        drawerStyle: {
          width: '82%',
        },
      }}
      drawerContent={(props) => <SidebarScreen {...props} />}>
      <Drawer.Screen name="Home" component={Dashboard} options={({ navigation }) => ({
        header: () => (
          <CustomHeader
            navigation={navigation}
            title="Student App"
            showNotification={false}
          />
        ),
      })} />
    </Drawer.Navigator>
  );
}
