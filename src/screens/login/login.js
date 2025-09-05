import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  CheckBox,
  Platform, Alert, Pressable, ScrollView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import SuccessModal from '../../components/Modals/successModel';
import ForgotPasswordModal from '../../components/Modals/ForgotPasswordModal';
import colors from '../../utils/colors';
import Api from '../../utils/Api';
import { SET_USER } from '../../redux/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFacultyLogin } from '../../utils/serviceApi';
import { TextInput as PaperTextInput } from 'react-native-paper';
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showLoader, setLoader] = useState(false);
  const [showErorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [facultyData, setFacultyData] = useState({
    username: '',
    password: ''
  });
  useEffect(() => {
    setErrorMsg('');
  }, []);

  const loginApi = async (facultyData) => {
    setErrorMsg('');
    setLoader(true);

    const params = {
      UserName: facultyData.username,
      Password: facultyData.password,
    };

    try {
      const response = await getFacultyLogin(params);
      //console.log("API Raw Response:", response);

      if (response?.status === 200) {
        // ✅ Success case
        const facultyInfo = Array.isArray(response.data) ? response.data[0] : response.data;

        if (!facultyInfo) {
          throw new Error("Invalid API response: facultyInfo missing");
        }
        await AsyncStorage.setItem('facultyInfo', JSON.stringify(facultyInfo));
        setLoader(false);
        navigation.replace('Home');
      }
      else if (response?.status === 400) {
        // ✅ Failure case (No Data Found)
        const msg = response?.data?.message || "Invalid Credentials";
        setErrorMsg(msg);
        setShowModal(true);
        setLoader(false);
      }
      else {
        // ✅ Any other unexpected response
        const msg = response?.data?.message || "Invalid login response";
        setErrorMsg(msg);
        setShowModal(true);
        setLoader(false);
      }

    } catch (error) {
      console.log("❌ Login API Error:", error);
      const errMsg = error.message || 'Something went wrong!';
      setErrorMsg(errMsg);
      setShowModal(true);
      setLoader(false);
    }
  };



  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const closeModal = () => setShowModal(false);
  return (
    <>
      {forgotModalVisible &&
        <ForgotPasswordModal
          showModal={forgotModalVisible}
          closeModal={() => setForgotModalVisible(false)}
          title="Forgot Password"
          content="Please contact the Administrator to reset your password."
          iconColor="red"
        />
      }
      {showLoader ? (
        <Loader visible={showLoader} />
      ) : (
        <SafeAreaView style={styles.container}>
          {/* Keyboard dismiss on tap outside */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
              {/* Title */}
              <Text style={styles.title}>Faculty Login</Text>

              {/* Illustration */}
              <View style={{ height: 510 }}>
                <Image
                  source={require('../../assets/faculty_image.png')}
                  style={styles.image}
                  resizeMode="contain"
                />

                <View style={{ padding: 5, marginTop: 15 }}>
                  <PaperTextInput
                    mode="outlined"
                    label="Username"
                    value={facultyData?.username}
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
                    onChangeText={(value) =>
                      setFacultyData({ ...facultyData, username: value })
                    }
                  />

                  <PaperTextInput
                    mode="outlined"
                    label="Password"
                    value={facultyData?.password}
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
                    secureTextEntry={!showPassword}
                    left={<PaperTextInput.Icon icon="lock" color={colors.themeColor} />}
                    right={
                      <PaperTextInput.Icon
                        icon={showPassword ? "eye" : "eye-off"}
                        onPress={() => setShowPassword((prev) => !prev)}
                      />
                    }
                    onChangeText={(value) =>
                      setFacultyData({ ...facultyData, password: value })
                    }
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
                    style={({ pressed }) => [
                      styles.loginButton,
                      pressed && { opacity: 0.6 },
                    ]}
                    onPress={() => {
                      if (!facultyData.username || !facultyData.password) {
                        setErrorMsg('Please Enter Username and Password!');
                        setShowModal(true);
                      } else {
                        loginApi(facultyData);
                      }
                    }}
                  >
                    <Text style={styles.loginText}>Login</Text>
                  </Pressable>
                </View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
    color: '#336699',
    height: 44,
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: 220,
    height: 200,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between'
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    paddingRight: 10,
    height: 50,
    color: colors.black,
  },
  label: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    marginBottom: 6,
    height: 30
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 10,
    height: 50,
    padding: 12,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    color: colors.black,
    width: '100%'
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#063057',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#0A9EDC',
  },
  rememberText: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  forgotText: {
    fontSize: 15,
    color: '#1A75FF',
    fontFamily: 'Montserrat-Medium',
  },
  loginButton: {
    backgroundColor: '#336699',
    borderColor: '#336699',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: '70%',
    height: 50
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Montserrat-SemiBold'
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
  inputText: {
    flex: 1,
    paddingLeft: 35,
    fontSize: 14,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    height: 50,
  },
  labelText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
  },
  iconStyle: {
    marginLeft: 10,
    paddingLeft: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Login;
