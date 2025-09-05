import {
  View,
  Text,
} from 'react-native';
import React from 'react';

const WithoutLoginPage = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Please Register Or Login
      </Text>
    </View>
  );
};

export default WithoutLoginPage;
