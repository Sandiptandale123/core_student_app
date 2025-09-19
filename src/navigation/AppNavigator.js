import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigation from './DrawerNavigation';
import {
  fitnessMappingHeaderOptions,
  hideHeaderOptions,
  MainHomeHeaderOptions,
  ReferPageHeaderOptions,
  UserScreenHeaderOptions,
  WorkoutPlansHeaderOptions,
} from './NavigationOptions';
import SplashScreen from '../screens/splashscreen/SplashScreen';
import Login from '../screens/login/login';
import ProfileScreen from '../screens/Profile/ProfileScreen1';
import CustomHeader from '../components/CustomHeader';
import PaymentListScreen from '../screens/payment/PaymentListScreen';
import PaymentDetailsScreen from '../screens/paymentDetails/PaymentDetailsScreen';
import ClassTimetableScreen from '../screens/classTimetable/ClassTimetableScreen';
import MonthlyAttendanceScreen from '../screens/monthlyAttendance/MonthlyAttendanceScreen';
import ExamTimetableScreen from '../screens/examTimetable/ExamTimetableScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Basic Info"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PaymentListScreen"
        component={PaymentListScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Payment List"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PaymentDetailsScreen"
        component={PaymentDetailsScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Payment Details"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ClassTimetableScreen"
        component={ClassTimetableScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Class Timetable"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="MonthlyAttendanceScreen"
        component={MonthlyAttendanceScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Monthly Attendance"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ExamTimetableScreen"
        component={ExamTimetableScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Exam Timetable"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
