import React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../../utils/colors';

const Loader = ({ visible, text = 'Loading...' }) => {
  return (
    <Spinner
      visible={visible} // true/false to show/hide loader
      textContent={text}
      textStyle={styles.textStyle}
      color={colors.themeColor}
      overlayColor="rgba(0,0,0,0.5)" // dark transparent background
    />
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  }
});

export default Loader;
