import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView, PermissionsAndroid, Platform, Alert, UIManager, LayoutAnimation
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../utils/colors';
import moment from 'moment';
import Api from '../../utils/Api';
import Loader from '../../components/Loader/Loader';
import { TextInput as PaperTextInput } from 'react-native-paper';
// Android me smooth animation ke liye
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const ProfileScreen = props => {
  const { navigation } = props;
  const { studentInfo } = props.route.params
  //console.log("ProfileScreenprintuserdata", JSON.stringify(studentInfo))
  const [fullName, setFullName] = useState('');
  const [profileImage, setProfileImage] = useState(studentInfo?.photoPath);
  const [gender, setGender] = useState('');
  const [selectTab, setSelectTab] = useState(1)
  // Inside your component:
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [showLoader, setLoader] = useState(false);
  // Instead of string, use Date object
  const [dob, setDob] = useState(null);
  const [dobText, setDobText] = useState(''); // display purpose
  const [studentData, setStudentData] = useState(null)
  const [showErorMsg, setErrorMsg] = useState('');
  const [inputHeight, setInputHeight] = useState(45);

  // Dropdown states for each section
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const handleToggle = (section) => {
    setLoader(true); // Loader on
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      if (section === 1) {
        setIsOpen1(!isOpen1);
        setIsOpen2(false);
        setIsOpen3(false);
      } else if (section === 2) {
        setIsOpen1(false);
        setIsOpen2(!isOpen2);
        setIsOpen3(false);
      } else if (section === 3) {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen3(!isOpen3);
      }
      setLoader(false); // Loader off after 1 sec
    }, 1000); // 1 second delay
  };


  const toggleSection1 = () => {
    LayoutAnimation.easeInEaseOut();
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
    setIsOpen3(false);
  };

  const toggleSection2 = () => {
    LayoutAnimation.easeInEaseOut();
    setIsOpen1(false);
    setIsOpen2(!isOpen2);
    setIsOpen3(false);
  };

  const toggleSection3 = () => {
    LayoutAnimation.easeInEaseOut();
    setIsOpen1(false);
    setIsOpen2(false);
    setIsOpen3(!isOpen3);
  };

  useEffect(() => {
    studentProfileApi();
  }, []);
  const studentProfileApi = () => {
    setErrorMsg('');
    if (studentInfo.studentID) {
      setLoader(true);
      const params = {
        StudentID: studentInfo.studentID,
        //DatabaseName: studentInfo.databaseName
        // UserName: 'aabhondwe',
        // Password: '123456789'
      };
      Api.getApi('StudentProfile/GetStudentProfileDetailsList', params)
        .then(response => {
          if (response.status === 200) {
            //console.log("print response && response.data[0]", JSON.stringify(response.data[0]))
            setLoader(false);
            //dispatch({ type: SET_USER, payload: response.data[0] });
            setStudentData(response.data[0])
            //timeout();
          } else {
            Alert(response.data.message);
            setLoader(false);
          }
        })
        .catch(error => {
          setLoader(false);
          if (error.response?.data?.message) {
            setErrorMsg(error.response.data.message);
          }
        });
    } else {
      setErrorMsg('Please Enter Username and Password!');
    }
  };

  const PersonalInfo1 = () => {
    return (
      <View>
        {/* <View style={styles.profileContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../../assets/profile_picture.png')
            }
            style={styles.profileImage}
          />
        </View> */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Full Name</Text>}
          value={studentData?.studentName !== '' ? studentData?.studentName : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="account" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Father /Husband Name</Text>}
          value={studentData?.fatherName !== null ? studentData?.fatherName : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="account-outline" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Mother Name</Text>}
          value={studentData?.studentMothersName !== '' ? studentData?.studentMothersName : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="account-heart-outline" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
        {/* Gender */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Gender</Text>}
          value={studentData?.gender !== '' ? studentData?.gender : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="gender-male-female" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Phone */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Mobile No</Text>}
          value={studentData?.studentMobileNo !== '' ? studentData?.studentMobileNo : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="phone" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Email */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Email</Text>}
          value={studentData?.studentMailID !== '' ? studentData?.studentMailID : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="email" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
      </View>
    )
  }

  const PersonalInfo2 = () => {
    return (
      <View>
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Religion</Text>}
          value={studentData?.personalInfoII?.religionDescription !== '' ? studentData?.personalInfoII?.religionDescription : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="account-star" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Caste</Text>}
          value={studentData?.personalInfoII?.reservationCategoryName !== '' ? studentData?.personalInfoII?.reservationCategoryName : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="account-group" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Caste Category</Text>}
          value={studentData?.personalInfoII?.casteDescription !== '' ? studentData?.personalInfoII?.casteDescription : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="account-group" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Blood Group</Text>}
          value={studentData?.personalInfoII?.studentBloodGroup !== '' ? studentData?.personalInfoII?.studentBloodGroup : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="blood-bag" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
        {/* Date of Birth */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Date of Birth</Text>}
          value={moment(studentData?.personalInfoII?.studentBirthDate).format('DD-MM-YYYY')}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="calendar" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Gender */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Physical Disability</Text>}
          value={studentData?.personalInfoII?.physicalDisabilityName !== '' ? studentData?.personalInfoII?.physicalDisabilityName : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="wheelchair-accessibility" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Phone */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Aadhar No</Text>}
          value={studentData?.personalInfoII?.aadharNoID !== '' ? studentData?.personalInfoII?.aadharNoID : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="card-account-details" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Email */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>ABC ID</Text>}
          value={studentData?.personalInfoII?.abcid !== '' ? studentData?.personalInfoII?.abcid : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="card-account-details-outline" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
      </View>
    )
  }

  const PersonalInfo3 = () => {
    return (
      <View>
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Address</Text>}
          value={studentData?.studentAddress?.studentLocalAddress !== '' ? studentData?.studentAddress?.studentLocalAddress : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="home-map-marker" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>State</Text>}
          value={studentData?.studentAddress?.localStateName !== '' ? studentData?.studentAddress?.localStateName : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="map" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>District</Text>}
          value={studentData?.studentAddress?.localDistrictName !== '' ? studentData?.studentAddress?.localDistrictName : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="map-marker-radius" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Tahsil</Text>}
          value={studentData?.studentAddress?.localTahsilName !== '' ? studentData?.studentAddress?.localTahsilName : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="map-marker-outline" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
        {/* Date of Birth */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>City / Town / Village</Text>}
          value={studentData?.studentAddress?.studentLocalCity !== '' ? studentData?.studentAddress?.studentLocalCity : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="city" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Gender */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Pincode</Text>}
          value={studentData?.studentAddress?.studentLocalPincode !== '' ? studentData?.studentAddress?.studentLocalPincode : '-'}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="form-textbox" color={colors.themeColor} style={styles.iconStyle} size={20} />
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />
      </View>
    )
  }

  return (
    <>
      {showLoader ? (
        <Loader visible={showLoader} />
      ) : (<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => handleToggle(1)}
        >
          <Text style={styles.dropdownHeaderText}>Personal Info 1</Text>
          <Icon
            name={isOpen1 ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#03641A"
          />
        </TouchableOpacity>
        {isOpen1 && <PersonalInfo1 />}

        {/* Personal Info 2 */}
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => handleToggle(2)}
        >
          <Text style={styles.dropdownHeaderText}>Personal Info 2</Text>
          <Icon
            name={isOpen2 ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#03641A"
          />
        </TouchableOpacity>
        {isOpen2 && <PersonalInfo2 />}

        {/* Personal Info 3 */}
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => handleToggle(3)}
        >
          <Text style={styles.dropdownHeaderText}>Personal Info 3</Text>
          <Icon
            name={isOpen3 ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#03641A"
          />
        </TouchableOpacity>
        {isOpen3 && <PersonalInfo3 />}

        {showErorMsg !== '' && (
          <Text style={styles.errorText}>{showErorMsg}</Text>
        )}
        {/* <TouchableOpacity style={{ backgroundColor: colors.themeColor, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 80, width: '80%', alignSelf: 'center' }}>
          <Text style={styles.saveLabel}>Save</Text>
        </TouchableOpacity> */}
      </ScrollView>
      )}
    </>
  );
}


export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F8F8F8',
  },

  profileContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.themeColor,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
  },
  commonPaperInput: {
    backgroundColor: '#FFFFFF',
    height: 45,
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginLeft: 10,
    paddingLeft: 5,
  },

  inputText: {
    flex: 1,
    paddingLeft: 30,
    fontSize: 13,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    height: 45,
  },

  inputTheme: {
    roundness: 10,
    colors: {
      primary: colors.themeColor,
      text: colors.black,
      placeholder: '#999',
    },
  },
  dropdownHeader: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  dropdownHeaderText: {
    color: '#03641A',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },

});
