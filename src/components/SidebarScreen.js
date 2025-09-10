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
  //console.log("printuserdata",JSON.stringify(props))
  // console.log(
  //   props.userInfo,
  //   'props.userInfoprops.userInfoprops.userInfodrawer',
  // );
  // const studentInfo = useSelector(state => state.userState?.studentInfo);
  // console.log(JSON.stringify(studentInfo), "sidebar.studentInfo")
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
  //console.log(JSON.stringify(studentInfo), "sidebar.studentInfo")
  const clearStorage = () => {
    //UserAction.resetUserDetails();
    navigation.navigate('SplashScreen');
  };

  const menuList = [
    {
      name: 'Profile',
      id: 1,
      icon: require('../assets/icon_profile.png'),
      color: '#007CCD'
    },
    {
      name: 'Payment List',
      id: 2,
      icon: require('../assets/exam_results.png'),
      color: '#3F8DE8',
    },
    // {
    //   name: 'Marks Entry',
    //   id: 3,
    //   icon: require('../assets/attendance_icon.png'),
    //   color: '#9C27B0'
    // },
    {
      name: 'Password',
      id: 3,
      icon: require('../assets/password_icon.png'),
      color: '#5EC878',
    },
    // {
    //   name: 'Class Admin',
    //   id: 2,
    //   icon: require('../assets/class_admin_icon.png'),
    //   color: '#B782FF',
    //   subList: [
    //     {
    //       name: 'Class Time Table',
    //       id: 2.1,
    //       icon: require('../assets/class_schedule_icon.png'),
    //       color: '#1976D2'
    //     },
    //     {
    //       name: 'Class Attendance Entry',
    //       id: 2.2,
    //       icon: require('../assets/attendance_icon.png'),
    //       color: '#4CAF50'
    //     }
    //   ],
    // },
    // {
    //   name: 'Leave',
    //   id: 3,
    //   icon: require('../assets/leave_icon.png'),
    //   color: '#3F8DE8',
    //   subList: [
    //     {
    //       name: 'Leave Application',
    //       id: 3.1,
    //       icon: require('../assets/leave.png'),
    //       color: '#1976D2'
    //     },
    //     {
    //       name: 'Leave Approval',
    //       id: 3.2,
    //       icon: require('../assets/approval.png'),
    //       color: '#4CAF50'
    //     }
    //   ],
    // },
    // {
    //   name: 'Examination',
    //   id: 4,
    //   icon: require('../assets/examination_icon.png'),
    //   color: '#FFB936',
    //   subList: [
    //     {
    //       name: 'Course Wise Methods Marks Entry',
    //       id: 4.1,
    //       icon: require('../assets/student_grades.png'),
    //       color: '#1976D2'
    //     },
    //     {
    //       name: 'Course Wise Result Details',
    //       id: 4.2,
    //       icon: require('../assets/exam_results.png'),
    //       color: '#9C27B0'
    //     }
    //   ],
    // },

  ];
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

  const createTwoButtonAlert = () =>
    Alert.alert('Logout', 'Are you sure to logout', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => clearStorage(),
      },
    ]);
  const [listIndex, setIndex] = useState(-1);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', borderTopRightRadius: 25, borderBottomRightRadius: 25 ,}}>
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
          <Image
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
          {menuList.map((item, index) => (
            <View key={`main-${item.id}`}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  if (item.id === 1) {
                    navigation.navigate('ProfileScreen', { studentInfo: studentInfo });
                    navigation.closeDrawer();
                  } else if (item.id === 2) {
                    navigation.navigate('PaymentListScreen', { studentInfo: studentInfo });
                  } else if (item.id === 3) {
                    setForgotModalVisible(true)
                  }
                }}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconView, { backgroundColor: item.color }]}>
                    <Image source={item.icon} style={[styles.menuIcon]} />
                  </View>
                  <Text style={styles.menuText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
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
