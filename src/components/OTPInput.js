import React, { useRef, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ length = 4, defaultOtp = '' }) => {
  const inputs = Array(length)
    .fill()
    .map(() => useRef(null));

  const [otp, setOtp] = useState(Array(length).fill(''));

  // Set default OTP if passed
  useEffect(() => {
    if (defaultOtp && defaultOtp.length === length) {
      setOtp(defaultOtp.split(''));
    }
  }, [defaultOtp]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs[index - 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={inputs[index]}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  input: {
    width: 60,
    height: 50,
    margin: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#fff',
  },
});

export default OTPInput;
