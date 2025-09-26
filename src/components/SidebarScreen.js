import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
//import {UserAction} from '../../reduxManager';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';
import ForgotPasswordModal from './Modals/ForgotPasswordModal';
import LogoutConfirmationModal from './Modals/LogoutConfirmationModal';
//import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RESET_USER } from '../redux/types';
const SidebarScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
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

  const [menuList1, setMenuList] = useState([]);
  const dashboardColors = [
    '#4CAF50',
    '#2196F3',
    '#9C27B0',
    '#FF99DD',
    '#FF9800',
    '#F44336',
    '#00BCD4',
    '#8BC34A',
    '#FFC107',
    '#795548',
  ];

  useEffect(() => {
    if (studentInfo) {
      const sysProgList = studentInfo?.sysModList?.[0]?.sysSubModList?.[0]?.sysProgList;
      setMenuList(sysProgList || []);
    }
  }, [studentInfo]);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // clear all local storage
      dispatch({ type: 'RESET_USER' }); // if you have a Redux action to reset user
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      }); // reset stack so user can't go back
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setShowLogoutModal(false);
    }
  };
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  return (
    <>
      {forgotModalVisible && (
        <ForgotPasswordModal
          showModal={forgotModalVisible}
          closeModal={() => setForgotModalVisible(false)}
          title="Forgot Password"
          content="Please contact the Administrator to reset your password."
          iconColor="red"
        />
      )}
      <LogoutConfirmationModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', borderTopRightRadius: 25, borderBottomRightRadius: 25, }}>
        {/* Close Button */}
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => props.navigation.closeDrawer()}>
          <Image
            source={require('../assets/close_icon.png')}
            style={{ width: 30, height: 30, tintColor: colors.themeColor }}
          />
        </TouchableOpacity>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image resizeMode='stretch'
            source={
              studentInfo?.photoPath && studentInfo?.photoPath !== ''
                ? { uri: studentInfo?.photoPath }
                : require('../assets/profile_picture.png')
            }
            style={styles.profileImg}
          />
          <View style={{ marginHorizontal: 10, justifyContent: 'center', alignItems: 'flex-start', }}>
            <Text style={styles.userName}>{studentInfo?.firstName}  {studentInfo?.lastName}</Text>
            <Text style={styles.userEmail}>{studentInfo?.studeMailId}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Menu List */}
        <ScrollView style={styles.menuContainer}>
          {menuList1.map((item, index) => (
            <View key={`main-${item.sysProgID}`}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  if (item.sysProgID === 9579) {
                    navigation.navigate('ProfileScreen', { studentInfo: studentInfo });
                    navigation.closeDrawer();
                  } else if (item.sysProgID === 9575) {
                    navigation.navigate('PaymentListScreen', { studentInfo: studentInfo });
                  } else if (item.sysProgID === 16076) {
                    navigation.navigate('ClassTimetableScreen', { studentInfo: studentInfo });
                  } else if (item.sysProgID === 16077) {
                    navigation.navigate('MonthlyAttendanceScreen', { studentInfo: studentInfo });
                  } else if (item.sysProgID === 16079) {
                    navigation.navigate('ExamTimetableScreen', { studentInfo: studentInfo });
                  }else if (item.sysProgID === 16080) {
                    navigation.navigate('AcademicCalendarScreen', { studentInfo: studentInfo });
                  }else if (item.sysProgID === 16081) {
                    navigation.navigate('HolidayListScreen', { studentInfo: studentInfo });
                  }
                  else {
                    navigation.navigate('Home')
                  }
                }}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconView, { backgroundColor: dashboardColors[index % dashboardColors.length], borderRadius: 17.5 }]}>
                    {/* <Image source={item.icon} style={[styles.menuIcon]} /> */}
                    <Image source={require('../assets/icon_profile.png')} style={[styles.menuIcon]} />
                  </View>
                  <Text style={styles.menuText}>{item.sysProgName}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
          <View>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setForgotModalVisible(true)
              }}>
              <View style={styles.menuLeft}>
                <View style={[styles.menuIconView, { backgroundColor: '#5EC878', borderRadius: 17.5 }]}>
                  {/* <Image source={item.icon} style={[styles.menuIcon]} /> */}
                  <Image source={require('../assets/password_icon.png')} style={[styles.menuIcon,]} />
                </View>
                <Text style={styles.menuText}>{'Password'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Bottom Options */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              width: '50%',
              flexDirection: 'row',
              paddingVertical: 5,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.lightGrey,
            }}
            onPress={() => {
              setShowLogoutModal(true)
            }}>
            <View style={styles.menuLeft}>
              <View style={[styles.menuIconView,]}>
                <Image
                  source={require('../assets/logout_icon.png')}
                  style={[styles.menuIcon, { tintColor: 'red' }]}
                />
              </View>
              <Text style={[styles.menuText, { color: 'black' }]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    height: 30,
    width: 30,
    marginHorizontal: 20,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    padding: 10
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#01395A',
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.themeColor,
  },
  divider: {
    height: 1,
    backgroundColor: '#C4C4C4',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  menudivider: {
    height: 1,
    backgroundColor: '#C4C4C4',
    width: '100%',
    alignSelf: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: colors.darkBlue,
    marginVertical: 2,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  menuLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  menuIconView: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: colors.white,
  },
  menuText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: colors.white,
  },
  dropdownIcon: {
    backgroundColor: '#DFF5FF',
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subList: {
    marginTop: 5,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  subItem: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'left',
    backgroundColor: '#FFFFFF',
    marginVertical: 2,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  subIconWrapper: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subMenuIcon: {
    width: 24,
    height: 24,
    tintColor: colors.white,
  },
  subText: {
    fontSize: 12,
    color: colors.themeColor,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    marginLeft: 5
  },
  bottomSection: {
    paddingHorizontal: 4,
    paddingBottom: 5,
  },
});

// function mapStateToProps(state) {
//   return {
//     userInfo: state.userData,
//   };
// }
// export default connect(mapStateToProps)(SidebarScreen);
export default SidebarScreen;
