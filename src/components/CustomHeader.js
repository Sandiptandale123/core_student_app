import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";
const CustomHeader = ({
  navigation,
  title = '',
  showBack = false,
  showNotification = false,
}) => {
  const handleLeftPress = () => {
    if (showBack) {
      navigation.goBack();
    } else {
      navigation.toggleDrawer();
    }
  };
  const [studentInfo, setStudentInfo] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('studentInfo');
        if (storedUser) {
          setStudentInfo(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Error loading studentInfo:", error);
      }
    };
    getUserData();
  }, []);
  //console.log("headerprintheaderstudentInfo", JSON.stringify(studentInfo))

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: '#336699' }}>
      <View style={styles.header}>
        <StatusBar barStyle="light-content" backgroundColor="#336699" />

        {/* Left Icon + Title */}
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={handleLeftPress} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon
              name={showBack ? 'arrow-back' : 'menu'}
              size={22}
              color="#fff"
            />
            {/* <Text style={styles.title}>{'Core'}</Text> */}
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        </View>

        {/* Right Section - Username + Profile Photo */}
        <View style={styles.rightSection}>
          {showNotification && (
            <TouchableOpacity style={styles.iconRight}>
              <Icon name="notifications-outline" size={25} color="#fff" />
              <View style={styles.redDot} />
            </TouchableOpacity>
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {/* Username */}
            <Text style={styles.username}>{studentInfo?.firstName} {studentInfo?.lastName}</Text>

            {/* Profile Photo */}
            {/* <Image
      source={
        profileImage
          ? { uri: profileImage }
          : require('../assets/profile_picture.png')
      }
      style={styles.profileImage}
    /> */}
            <Image resizeMode='stretch'
              source={
                studentInfo?.photoPath && studentInfo?.photoPath !== ''
                  ? { uri: studentInfo?.photoPath }
                  : require('../assets/profile_picture.png')
              }
              style={styles.profileImage}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: "#336699",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 10,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "#fff",
    fontSize: 12,
    marginRight: 8,
    fontFamily: 'Montserrat-SemiBold',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#eee",
  },
  iconRight: {
    marginRight: 10,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    position: "absolute",
    top: -2,
    right: -2,
  },
});


export default CustomHeader;
