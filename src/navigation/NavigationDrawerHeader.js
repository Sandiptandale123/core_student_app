import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const NavigationLeftHeader = props => {
  const toggleDrawer = () => {
    props.navigation.openDrawer();
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  // const goBackCreateEventScreen = () => {
  //   props.navigation.navigate('CreateEventScreen');
  // };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // zIndex:-1,
      }}>
      {props.menu ? (
        <TouchableOpacity style={{marginLeft: 25}} onPress={toggleDrawer}>
          {/* <Image source={MENU_LEFT_LOGO} /> */}
          <Text>Hii</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const NavigationRightHeader = props => {
  const toggleDrawer = () => {
    props.navigation.openDrawer();
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // zIndex:-1,
      }}>
      {props.home1 ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 20,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // onPress={toggleDrawer}
          >
            {/* <Image
                            resizeMode='contain'
                            source={require('../assets/images/app_logo.jpg')}
                            style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#000000' }}
                        /> */}
            <Text
              numberOfLines={1}
              style={{
                color: '#000000',
                fontSize: 22,
                fontFamily: 'Montserrat-Medium',
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              TRN FITNESS STUDIO
            </Text>
          </TouchableOpacity>
        </View>
      ) : props.title ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // onPress={toggleDrawer}
          >
            {/* <Image
                            resizeMode='contain'
                            source={require('../assets/images/app_logo.jpg')}
                            style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#000000' }}
                        /> */}
            <Text
              numberOfLines={1}
              style={{
                color: '#000000',
                fontSize: 20,
                fontFamily: 'Montserrat-Medium',
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              {props.title}
            </Text>
          </TouchableOpacity>
        </View>
      ) : props.home ? (
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => {
            props.navigation.openDrawer();
          }}>
          <MaterialCommunityIcons
            name={'menu'}
            size={30}
            color={'#42a5f5'}
            style={{alignItems: 'center'}}
          />
        </TouchableOpacity>
      ) : props.userScreen ? (
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => {
            //props.navigation.openDrawer();
          }}>
          <MaterialCommunityIcons
            name={'menu'}
            size={30}
            color={'#ECAC4A'}
            style={{alignItems: 'center'}}
          />
        </TouchableOpacity>
      ) : props.fitnessMapping ? (
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => {
            props.navigation.openDrawer();
          }}>
          <MaterialCommunityIcons
            name={'menu'}
            size={30}
            color={'#ECAC4A'}
            style={{alignItems: 'center'}}
          />
        </TouchableOpacity>
      ) : props.homeRight ? (
        <TouchableOpacity style={styles.rightIconContainer}>
          <Ionicons name="notifications" size={24} color="#00779B" />
        </TouchableOpacity>
      ) : props.homeTitle ? (
        <Text style={styles.headerTitle}>CoreStudentApp</Text>
      ) : props.workoutplan ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 20,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // onPress={toggleDrawer}
          >
            {/* <Image
                            resizeMode='contain'
                            source={require('../assets/images/app_logo.jpg')}
                            style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#000000' }}
                        /> */}
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 22,
                fontFamily: 'Montserrat-Medium',
                // marginTop: 5,
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              Workout Plan
            </Text>
          </TouchableOpacity>
        </View>
      ) : props.dietplan ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 20,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // onPress={toggleDrawer}
          >
            {/* <Image
                            resizeMode='contain'
                            source={require('../assets/images/app_logo.jpg')}
                            style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#000000' }}
                        /> */}
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 22,
                fontFamily: 'Montserrat-Medium',
                // marginTop: 5,
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              Explore
            </Text>
          </TouchableOpacity>
        </View>
      ) : props.account ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 20,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // onPress={toggleDrawer}
          >
            {/* <Image
                                resizeMode='contain'
                                source={require('../assets/images/app_logo.jpg')}
                                style={{ height: 25, width: 25, alignSelf: 'center', tintColor: '#000000' }}
                            /> */}
            <Text
              style={{
                color: '#000',
                fontSize: 22,
                fontFamily: 'Montserrat-Medium',
                // marginTop: 5,
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              My Account
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export const NavigationCenterHeader = props => {
  const toggleDrawer = () => {
    props.navigation.openDrawer();
  };

  const goBack = () => {
    props.navigation.goBack();
  };
  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: -90,
          // width: Dimensions.get('window').width - 15,
        }}>
        {props.homeHeaderTab ? (
          <>
            {/* <Image
                            source={require('../assets/images/app_logo.jpg')}
                            style={{
                                width: 20,
                                height: 25,
                                //  marginLeft:-90,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            resizeMode={'contain'}
                        /> */}
            {/* <View style={{
                            justifyContent: 'center',
                            alignItems: 'center', marginRight: -300
                        }}>
                            <Icon name="menu" size={30} color="#AB750C" />
                        </View> */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
              //onPress={toggleDrawer}
              >
                <Icon name="menu" size={30} color="#000" />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontFamily: 'Montserrat-Bold',
                  // marginTop: 5,
                  textAlign: 'center',
                  alignSelf: 'center',
                  marginLeft: 20,
                }}>
                TRN FITNESS STUDIO
              </Text>
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 15,
    elevation: 4, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  leftIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    marginLeft: 10,
  },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
