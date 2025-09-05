import React, { useEffect, useState, useRef } from 'react';
// import
import { View, Text, Image, TouchableOpacity } from 'react-native';
import HeaderBack from '../components/Headers/headerBack';
import HeaderLeft from '../components/Headers/headerLeft';
import HeaderTitle from '../components/Headers/headerTitle';
import {
  NavigationLeftHeader,
  NavigationRightHeader,
  NavigationCenterHeader,
} from '../navigation/NavigationDrawerHeader';
import colors from '../utils/colors';
export const hideHeaderOptions = ({ navigation }) => {
  return {
    headerShown: false,
  };
};
export const HomeHeaderOptions = ({ navigation }) => {
  return {
    //headerLeft: () => <NavigationRightHeader navigation={navigation} home />,
    //it will hide hamburger left side default
    // headerLeft: () => <NavigationLeftHeader navigation={navigation}  />,
    //headerShown: null,
    headerTitle: () => (
      <NavigationCenterHeader navigation={navigation} homeHeaderTab />
    ),
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerTransparent: true,
    headerTitleStyle: {
      color: '#36384C',
      fontSize: 15,
      fontFamily: 'Montserrat-Bold',
      marginTop: 25,
    },
  };
};

export const PostPropertyProfileHeaderOptions = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: '#ffffff',
    },
    tabBarVisible: true,
    headerLeft: () => <HeaderBack navigation={navigation} />,
    headerTitle: () => (
      <NavigationRightHeader navigation={navigation} title="Property Profile" />
    ),
  };
};
export const MainHomeHeaderOptions = ({ navigation }) => {
  return {
    // headerLeft: () => <NavigationRightHeader navigation={navigation} home />,
    // headerTitle: () => <NavigationRightHeader navigation={navigation} homeTitle />,
    // headerTitleAlign: 'left',
    // headerStyle: {
    //   backgroundColor: '#FFFFFF',
    //   shadowColor: '#7F5DF0',
    //   shadowOffset: {
    //     width: 0,
    //     height: 10,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.5,
    //   elevation: 5,
    // },
    // headerTransparent: true,
    // headerTitleStyle: {
    //   color: '#36384C',
    //   fontSize: 15,
    //   fontFamily: 'Montserrat-Bold',
    //   marginTop: 25,
    // },
    headerStyle: {
      backgroundColor: '#81BFDA',
      height: 130,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20
    },
    headerTitleStyle: {
      color: '#36384C',
      fontSize: 15,
      fontFamily: 'Montserrat-Bold',
      marginTop: 25,
    },
    tabBarVisible: true,
    headerLeft: () => <HeaderLeft navigation={navigation} />,
    headerTitle: () => (
      <HeaderTitle navigation={navigation} title="Lello App" />
    ),
    // headerTitle: () => (
    //   <NavigationCenterHeader navigation={navigation} title="Lello App" />
    // ),
    headerTitleAlign: 'center',
  };
};
export const ReferPageHeaderOptions = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: colors.mainHeaderColor,
    },
    tabBarVisible: true,
    title: 'Refer & Earn',
    headerTitleStyle: {
      color: '#000',
    },

    headerLeft: () => <HeaderBack navigation={navigation} />,
  };
};
export const PremiumPostHeaderOptions = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: colors.mainHeaderColor,
    },
    tabBarVisible: true,
    title: 'Post Task',
    headerTitleStyle: {
      color: '#000',
    },

    headerLeft: () => <HeaderBack navigation={navigation} />,
  };
};
export const TaskDetailsHeaderOptions = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: colors.mainHeaderColor,
    },
    tabBarVisible: true,
    title: 'Task Details',
    headerTitleStyle: {
      color: '#000',
    },

    headerLeft: () => <HeaderBack navigation={navigation} />,
  };
};
export const BrowseHeaderOptions = ({ navigation }) => {
  return {
    headerStyle: {
      // backgroundColor: colors.mainColor
    },
    tabBarVisible: true,
    headerLeft: () => <HeaderLeft navigation={navigation} />,

    headerTitle: () => (
      <HeaderTitle navigation={navigation} title="Shortlisted " />
    ),
  };
};
export const ChatPageHeaderOptions = ({ navigation }) => {
  return {
    headerStyle: {
      // backgroundColor: colors.mainColor
    },
    tabBarVisible: true,
    headerLeft: () => <HeaderLeft navigation={navigation} />,

    headerTitle: () => <HeaderTitle navigation={navigation} title="Chat" />,
  };
};

export const MyAccountPageHeaderOptions = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: '#E6E9F0',
    },
    tabBarVisible: true,
    headerLeft: () => <HeaderLeft navigation={navigation} />,

    headerTitle: () => <HeaderTitle navigation={navigation} title="Profile" />,
  };
};

export const UserScreenHeaderOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <NavigationRightHeader navigation={navigation} userScreen />
    ),
    //headerRight: () => <NavigationRightHeader navigation={navigation} homeRight />,
    headerTitle: () => (
      <NavigationRightHeader navigation={navigation} homeTitle />
    ),
    //title: () => <NavigationRightHeader navigation={navigation} homeTitle />,
    //it will hide hamburger left side default
    // headerLeft: () => <NavigationLeftHeader navigation={navigation}  />,
    //headerShown: null,
    // title: <Text style={styles.headerTitle}>Aditya</Text>,
    headerTitleAlign: 'left',
    headerStyle: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#7F5DF0',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
    headerTransparent: true,
    headerTitleStyle: {
      color: '#36384C',
      fontSize: 15,
      fontFamily: 'Montserrat-Bold',
      marginTop: 25,
    },
  };
};
export const fitnessMappingHeaderOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <NavigationRightHeader navigation={navigation} fitnessMapping />
    ),
    //headerRight: () => <NavigationRightHeader navigation={navigation} homeRight />,
    headerTitle: () => (
      <NavigationRightHeader navigation={navigation} homeTitle />
    ),
    //title: () => <NavigationRightHeader navigation={navigation} homeTitle />,
    //it will hide hamburger left side default
    // headerLeft: () => <NavigationLeftHeader navigation={navigation}  />,
    //headerShown: null,
    // title: <Text style={styles.headerTitle}>Aditya</Text>,
    headerTitleAlign: 'left',
    headerStyle: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#7F5DF0',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
    headerTransparent: true,
    headerTitleStyle: {
      color: '#36384C',
      fontSize: 15,
      fontFamily: 'Montserrat-Bold',
      marginTop: 25,
    },
  };
};
export const CreateUserHeaderOptions = ({ navigation }) => {
  return {
    //headerLeft: () => <NavigationRightHeader navigation={navigation} home />,
    //it will hide hamburger left side default
    // headerLeft: () => <NavigationLeftHeader navigation={navigation}  />,
    //headerShown: null,
    headerTitle: () => (
      <NavigationCenterHeader navigation={navigation} homeHeaderTab />
    ),
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerTransparent: true,
    headerTitleStyle: {
      color: '#36384C',
      fontSize: 15,
      fontFamily: 'Montserrat-Bold',
      marginTop: 25,
    },
  };
};
export const WorkoutPlansHeaderOptions = ({ navigation }) => {
  return {
    //headerLeft: () => <NavigationRightHeader navigation={navigation} home />,
    //it will hide hamburger left side default
    headerLeft: () => <NavigationLeftHeader navigation={navigation} />,
    //headerShown: null,
    headerTitle: () => (
      <NavigationCenterHeader navigation={navigation} homeHeaderTab />
    ),
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerTransparent: true,
    headerTitleStyle: {
      color: '#36384C',
      fontSize: 15,
      fontFamily: 'Montserrat-Bold',
      marginTop: 25,
    },
  };
};

export const DietPlansHeaderOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <NavigationRightHeader navigation={navigation} dietplan />
    ),
    //it will hide hamburger left side default
    // headerLeft: () => <NavigationLeftHeader navigation={navigation}  />,
    //headerShown: null,
    headerTitle: () => (
      <NavigationCenterHeader navigation={navigation} homeHeaderTab />
    ),
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerTransparent: true,
    headerTitleStyle: {
      color: '#36384C',
      fontSize: 15,
      fontFamily: 'Montserrat-Bold',
      marginTop: 25,
    },
  };
};

export const MyAccountHeaderOptions = ({ navigation }) => {
  return {
    headerLeft: () => <NavigationRightHeader navigation={navigation} account />,
    //it will hide hamburger left side default
    // headerLeft: () => <NavigationLeftHeader navigation={navigation}  />,
    //headerShown: null,
    headerTitle: () => <NavigationCenterHeader navigation={navigation} />,
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerTransparent: true,
    headerTitleStyle: {
      color: '#36384C',
      fontSize: 15,
      fontFamily: 'Montserrat-Bold',
      marginTop: 25,
    },
  };
};
