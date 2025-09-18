import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import SuccessModal from '../../components/Modals/successModel';
import ForgotPasswordModal from '../../components/Modals/ForgotPasswordModal';
import colors from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStudentLogin } from '../../utils/serviceApi';
import { TextInput as PaperTextInput } from 'react-native-paper';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showLoader, setLoader] = useState(false);
  const [showErorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [forgotModalVisible, setForgotModalVisible] = useState(false);

  const [studentData, setStudentData] = useState({
    prn_no: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    setErrorMsg('');
  }, []);

  const loginApi = async (studentData) => {
    setErrorMsg('');
    setLoader(true);

    const params = {
      PRNNO: studentData.prn_no,
      UserName: studentData.username,
      Password: studentData.password,
    };

    try {
      const response = await getStudentLogin(params);
      //console.log('printresponse', JSON.stringify(response.data));
      if (response?.status === 200) {
        const studentInfo = Array.isArray(response.data) ? response.data[0] : response.data;
        if (!studentInfo) throw new Error('Invalid API response: studentInfo missing');
        await AsyncStorage.setItem('studentInfo', JSON.stringify(studentInfo));
        setLoader(false);
        navigation.replace('Home');
      } else if (response?.status === 400) {
        const msg = response?.data?.message || 'Invalid Credentials';
        setErrorMsg(msg);
        setShowModal(true);
        setLoader(false);
      } else {
        const msg = response?.data?.message || 'Invalid login response';
        setErrorMsg(msg);
        setShowModal(true);
        setLoader(false);
      }
    } catch (error) {
      console.log('❌ Login API Error:', error);
      const errMsg = error.message || 'Something went wrong!';
      setErrorMsg(errMsg);
      setShowModal(true);
      setLoader(false);
    }
  };

  const closeModal = () => setShowModal(false);

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

      {showLoader ? (
        <Loader visible={showLoader} />
      ) : (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 40 : 0 }}
              >
                {/* Title */}
                <Text style={styles.title}>Student Login</Text>

                {/* Illustration */}
                <Image
                  source={require('../../assets/student_image.png')}
                  style={styles.image}
                  resizeMode="contain"
                />

                {/* Form */}
                <View style={{ padding: 5, marginTop: 15 }}>
                  {/* <PaperTextInput
                    mode="outlined"
                    label="PRN No"
                    value={studentData?.prn_no}
                    outlineColor={colors.themeColor}
                    activeOutlineColor={colors.themeColor}
                    style={styles.commonPaperInput}
                    theme={{
                      ...styles.inputTheme,
                      fonts: {
                        ...styles.inputTheme?.fonts,
                        bodyLarge: { fontSize: 18 },
                      },
                    }}
                    placeholder="Enter PRN No"
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    left={<PaperTextInput.Icon icon="card-account-details" color={colors.themeColor} />}
                    onChangeText={(value) => setStudentData({ ...studentData, prn_no: value })}
                  /> */}

                  <PaperTextInput
                    mode="outlined"
                    label="Username"
                    value={studentData?.username}
                    outlineColor={colors.themeColor}
                    activeOutlineColor={colors.themeColor}
                    style={styles.commonPaperInput}
                    theme={{
                      ...styles.inputTheme,
                      fonts: {
                        ...styles.inputTheme?.fonts,
                        bodyLarge: { fontSize: 18 },
                      },
                    }}
                    placeholder="Enter Username"
                    autoCapitalize="none"
                    left={<PaperTextInput.Icon icon="account" color={colors.themeColor} />}
                    onChangeText={(value) => setStudentData({ ...studentData, username: value })}
                  />

                  <PaperTextInput
                    mode="outlined"
                    label="Password"
                    value={studentData?.password}
                    outlineColor={colors.themeColor}
                    activeOutlineColor={colors.themeColor}
                    style={styles.commonPaperInput}
                    theme={{
                      ...styles.inputTheme,
                      fonts: {
                        ...styles.inputTheme?.fonts,
                        bodyLarge: { fontSize: 18 },
                      },
                    }}
                    placeholder="Enter Password"
                    autoCapitalize="none"
                    secureTextEntry={!showPassword}
                    left={<PaperTextInput.Icon icon="lock" color={colors.themeColor} />}
                    right={
                      <PaperTextInput.Icon
                        icon={showPassword ? 'eye' : 'eye-off'}
                        onPress={() => setShowPassword((prev) => !prev)}
                      />
                    }
                    onChangeText={(value) => setStudentData({ ...studentData, password: value })}
                  />

                  <View style={styles.optionsRow}>
                    <Pressable
                      onPress={() => setForgotModalVisible(true)}
                      style={({ pressed }) => [pressed && { opacity: 0.6 }]}
                    >
                      <Text style={styles.forgotText}>Forgot Password?</Text>
                    </Pressable>
                  </View>

                  {showModal && showErorMsg !== '' && (
                    <SuccessModal showModal={showModal} closeModal={closeModal} message={showErorMsg} />
                  )}

                  {/* Login Button */}
                  <Pressable
                    style={({ pressed }) => [styles.loginButton, pressed && { opacity: 0.6 }]}
                    onPress={() => {
                      if (!studentData.username || !studentData.password) {
                        setErrorMsg('Please Enter Username and Password!');
                        setShowModal(true);
                      } else {
                        loginApi(studentData);
                      }
                    }}
                  >
                    <Text style={styles.loginText}>Login</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
   backgroundColor: '#fff',
  paddingHorizontal: 24,
  paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
    color: '#336699',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: '80%',
    height: 200,
    alignSelf: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 12,
  },
  forgotText: {
    fontSize: 15,
    color: '#1A75FF',
    fontFamily: 'Montserrat-Medium',
  },
  loginButton: {
    backgroundColor: '#336699',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: '70%',
    height: 50,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
  },
  commonPaperInput: {
    backgroundColor: '#FFFFFF',
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputTheme: {
    roundness: 5,
    colors: {
      primary: colors.themeColor,
      text: colors.black,
      placeholder: '#999',
    },
  },
});

export default Login;
