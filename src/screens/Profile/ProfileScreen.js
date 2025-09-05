import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView, PermissionsAndroid, Platform, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePickerModal from '../../components/ImagePickerModal';
import colors from '../../utils/colors';
import moment from 'moment';
import Api from '../../utils/Api';
import Loader from '../../components/Loader/Loader';
import { TextInput as PaperTextInput } from 'react-native-paper';

const ProfileScreen = props => {
  const { navigation } = props;
  const { facultyInfo } = props.route.params
  //console.log("printuserdata", JSON.stringify(facultyInfo))
  const [fullName, setFullName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [gender, setGender] = useState('');
  // Inside your component:
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [showLoader, setLoader] = useState(false);
  // Instead of string, use Date object
  const [dob, setDob] = useState(null);
  const [dobText, setDobText] = useState(''); // display purpose
  const [facultyData, setFacultyData] = useState(null)
  const [showErorMsg, setErrorMsg] = useState('');
  const [inputHeight, setInputHeight] = useState(45);
  useEffect(() => {
    facultyProfileApi();
  }, []);
  const facultyProfileApi = () => {
    setErrorMsg('');
    if (facultyInfo.sysUserID && facultyInfo.databaseName) {
      setLoader(true);
      const params = {
        LoginID: facultyInfo.sysUserID,
        DatabaseName: facultyInfo.databaseName
        // UserName: 'aabhondwe',
        // Password: '123456789'
      };
      Api.getApi('BasicExaminer/GetBasicExaminerListBySysUserIDForprofile', params)
        .then(response => {
          if (response.status === 200) {
            //console.log("print response && response.data[0]", JSON.stringify(response.data[0]))
            setLoader(false);
            //dispatch({ type: SET_USER, payload: response.data[0] });
            setFacultyData(response.data[0])
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


  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDob(selectedDate); // set Date object
      const formattedDate = selectedDate.toLocaleDateString('en-GB'); // e.g. 05/08/2025
      setDobText(formattedDate);
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const permissions = [];

        // Camera permission is needed
        permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);

        // For Android 13+
        if (Platform.Version >= 33) {
          permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
        } else {
          // For older Android versions
          permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        }

        const granted = await PermissionsAndroid.requestMultiple(permissions);

        const cameraGranted = granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED;
        const storageGranted =
          (Platform.Version >= 33 &&
            granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED) ||
          (Platform.Version < 33 &&
            granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED);

        return cameraGranted && storageGranted;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };


  const handleImagePick = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert("Permission denied", "Camera or Storage permission not granted");
      return;
    }

    Alert.alert(
      'Choose Option',
      '',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera({ mediaType: 'photo' }, (response) => {
              if (!response.didCancel && !response.errorCode && response.assets) {
                setProfileImage(response.assets[0].uri);
              }
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary({ mediaType: 'photo' }, (response) => {
              if (!response.didCancel && !response.errorCode && response.assets) {
                setProfileImage(response.assets[0].uri);
              }
            });
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      {showLoader ? (
        <Loader visible={showLoader} />
      ) : (<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {modalVisible &&
          <ImagePickerModal
            showModal={modalVisible}
            closeModal={() => setModalVisible(false)}
            onImagePick={(uri) => setProfileImage(uri)}
          />

        }
        {/* Profile Image */}
        {/* <View style={styles.profileContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../../assets/user_profile.png')
          }
          style={styles.profileImage}
        />

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Icon name="camera" size={15} color="#000" />
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>

      </View> */}
        <View style={styles.profileContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../../assets/profile_picture.png')
            }
            style={styles.profileImage}
          />
        </View>
        {/* Full Name */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Full Name</Text>}
          value={facultyData?.examinerName}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="account" color={colors.themeColor} style={styles.iconStyle} size={20}/>
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Date of Birth */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Date of Birth</Text>}
          value={moment(facultyData?.examinerDateOfBirth).format('DD-MM-YYYY')}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="calendar" color={colors.themeColor} style={styles.iconStyle} size={20}/>
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Gender */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Gender</Text>}
          value={facultyData?.examinerGenderDesc}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="gender-male-female" color={colors.themeColor} style={styles.iconStyle} size={20}/>
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Phone */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Phone</Text>}
          value={facultyData?.examinerMobileNo}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="phone" color={colors.themeColor} style={styles.iconStyle} size={20}/>
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Email */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Email</Text>}
          value={facultyData?.examinerEmailID}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="mail" color={colors.themeColor} style={styles.iconStyle} size={20}/>
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Department */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Department</Text>}
          value={facultyData?.departmentName}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="office-building" color={colors.themeColor} style={styles.iconStyle} size={20}/>
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* College */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>College</Text>}
          value={facultyData?.collegeName}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="school" color={colors.themeColor} style={styles.iconStyle} size={20}/>
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* Address */}
        <PaperTextInput
          mode="outlined"
          label={<Text style={styles.labelText}>Address</Text>}
          value={facultyData?.examinerAddress1?.trim() ? facultyData.examinerAddress1 : "--"}
          editable={false}
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          style={styles.commonPaperInput}
          theme={styles.inputTheme}
          render={(props) => (
            <View style={styles.inputWrapper}>
              <PaperTextInput.Icon icon="map-marker" color={colors.themeColor} style={styles.iconStyle}  size={20}/>
              <TextInput {...props} style={styles.inputText} />
            </View>
          )}
        />

        {/* <PaperTextInput
          mode="outlined"
          label={<Text style={styles.label}>Address</Text>}
          value={
            facultyData?.examinerAddress1?.trim()
              ? facultyData.examinerAddress1
              : "--"
          }
          multiline
          editable={false}
          placeholder="Address"
          outlineColor={colors.themeColor}
          activeOutlineColor={colors.themeColor}
          left={<PaperTextInput.Icon icon="account" />}
          style={[
            styles.paperInput,
            {
              minHeight: 60,
              maxHeight: 100,   // 👈 isse jyada height nahi badhegi
              textAlignVertical: 'top',
            },
          ]}
          onContentSizeChange={(e) =>
            setInputHeight(Math.max(60, e.nativeEvent.contentSize.height))
          }
          theme={{
            roundness: 10,   // Border radius
            colors: {
              primary: colors.themeColor,
              text: colors.black,
              placeholder: '#999',
            },
          }}
        /> */}

        {/* <Text style={styles.label}>Address</Text>
        <TextInput
          value={facultyData?.examinerAddress1}
          placeholder="Enter your address"
          style={[styles.inputStyle, { height: Math.max(45, inputHeight), textAlignVertical: 'top', marginBottom: 80, }]}
          placeholderTextColor={colors.lightGrey}
          multiline={true}
          editable={false}
          onContentSizeChange={(e) =>
            setInputHeight(e.nativeEvent.contentSize.height)
          }
        /> */}
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
    paddingLeft:5,
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
});
