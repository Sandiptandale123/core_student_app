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
import TermsAndConditions from '../screens/terms_condition/TermsAndConditions';
import PrivacyPolicy from '../screens/privacy_policy/PrivacyPolicy';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import CustomHeader from '../components/CustomHeader';
import ClassAttendanceScreen from '../screens/attendance/ClassAttendanceScreen';
import ClassAttendanceScreen1 from '../screens/attendance/ClassAttendanceScreen1';
import FindAttendanceScreen from '../screens/attendance/StudentAttendanceScreen';
import StudentAttendanceScreen from '../screens/attendance/StudentAttendanceScreen';
import CheckStudentAttendanceScreen from '../screens/attendance/CheckStudentAttendanceScreen';
import ClassTimeTableScreen from '../screens/classTimetable/ClassTimeTableScreen';
import CourseWiseMarksEntry from '../screens/marksEntry/CourseWiseMarksEntry';
import MarksEntryScreen from '../screens/marksEntry/MarksEntryScreen';
import ClassAttendanceEntryScreen from '../screens/attendance/ClassAttendanceEntryScreen';
import ClassAttendanceScreen2 from '../screens/attendance/ClassAttendanceScreen2';


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
        name="WelcomeScreen"
        component={WelcomeScreen}
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
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Terms And Conditions"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Privacy Policy"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ClassAttendanceEntryScreen"
        component={ClassAttendanceEntryScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Class Attendance"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
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
        name="ClassAttendanceScreen1"
        component={ClassAttendanceScreen1}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Attendance"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ClassAttendanceScreen2"
        component={ClassAttendanceScreen2}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Attendance"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="StudentAttendanceScreen"
        component={StudentAttendanceScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Attendance"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CheckStudentAttendanceScreen"
        component={CheckStudentAttendanceScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Attendance"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ClassTimeTableScreen"
        component={ClassTimeTableScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Class Attendance"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CourseWiseMarksEntry"
        component={CourseWiseMarksEntry}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Basic Subjects"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name="MarksEntryScreen"
        component={MarksEntryScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              navigation={navigation}
              title="Marks Entry"
              showNotification={false}
              showBack={true}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
