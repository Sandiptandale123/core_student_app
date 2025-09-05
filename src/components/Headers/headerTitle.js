import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ToastComponent from '../../components/ToastComponent/Toaster';
import { useSelector, useDispatch } from 'react-redux';
const HeaderTitle = props => {
  const { navigation } = props;
  const { userInfo } = useSelector(state => state.userState);
  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      {/* <Image
        source={require('../../assets/camera.png')} // update with your image path
        style={{
          flex: 1,
          height: 50, // set height as needed
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: 5
        }}
      /> */}
      {/* <Text>{props.title}</Text> */}
      <Text
        style={{
          color: '#000',
          fontSize: 20,
          fontFamily: 'Montserrat-Bold',
          // marginTop: 5,
          textAlign: 'center',
          alignSelf: 'center',
          marginLeft: -150,
        }}>
        {props.title}
      </Text>
    </View>
  );
};

export default HeaderTitle;