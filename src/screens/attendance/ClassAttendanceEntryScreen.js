import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput as PaperTextInput, Switch } from 'react-native-paper';
import colors from '../../utils/colors';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
import moment from 'moment';
import SuccessModal from '../../components/Modals/successModel';
import ForgotPasswordModal from '../../components/Modals/ForgotPasswordModal';
const ClassAttendanceEntryScreen = props => {
    const { navigation, route } = props;
    const { item, facultyInfo, showLoader, attendanceDate } = route.params;
    const [attendanceDate1, setAttendanceDate1] = useState(new Date(attendanceDate));
    //console.log("Got Date:", attendanceDate1);
    const [viewMode, setViewMode] = useState('prn');
    const [orderByPRN, setOrderByPRN] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [originalStudentList, setOriginalStudentList] = useState([]);
    const [showErorMsg, setErrorMsg] = useState('');
    const [showModalMsg, setModalMsg] = useState('');

    const [loader, setLoader] = useState(showLoader || false);
    useEffect(() => {
        if (showLoader) {
            setLoader(true);
            const timer = setTimeout(() => {
                setLoader(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showLoader]);

    useEffect(() => {
        GetStudentListForDivisionAttendanceApi();
    }, []);
    // ✅ local sorting effect
    useEffect(() => {
        if (originalStudentList && originalStudentList.length > 0) {
            setLoader(true);
            setTimeout(() => {   // delay de rahe hai, taaki UI smooth lage
                let sortedData = [...originalStudentList];

                if (orderByPRN === 2) {
                    sortedData.sort((a, b) => a.studentName.localeCompare(b.studentName));
                }
                setStudentList(sortedData);
                setLoader(false); // sorting ke baad loader stop
            }, 300); // 0.3 sec ka chhota delay
        }
    }, [orderByPRN, originalStudentList]);

    const toggleStatus = (studentID) => {
        setStudentList((prevList) => {
            return prevList.map(student => {
                if (student.studentID === studentID) {
                    return {
                        ...student,
                        attendanceStatus: student.attendanceStatus === 'P' ? 'A' : 'P'
                    };
                }
                return student;
            });
        });
    };



    const GetStudentListForDivisionAttendanceApi = () => {
        setErrorMsg('');
        if (facultyInfo?.examInstID) {
            setLoader(true);
            const params = {
                SubjectID: item?.subjectID,
                CoursePartID: item?.coursePartID,
                // SubjectID: 3223,
                // CoursePartID: 1091,
                DivisionID: item?.divisionID,
                AttendanceDate: moment(attendanceDate1).format('DD/MMM/YYYY'),
                AcademicInstanceID: facultyInfo?.acdYrID,
                //AcademicInstanceID: 15,
                DatabaseName: facultyInfo?.databaseName,
                Orderby: orderByPRN
            };
            //console.log("paramsparamsparams", JSON.stringify(params))
            Api.getApi('DivisionAttendance/GetStudentListForDivisionAttendance', params)
                .then(response => {
                    //console.log("DivisionAttendanceDivisionAttendance", JSON.stringify(response))
                    if (response.status === 200) {
                        setLoader(false);
                        //console.log("GetStudentListForDivisionAttendance", JSON.stringify(response.data))
                        setOriginalStudentList(response.data);
                        setStudentList(response.data)
                    } else {
                        Alert(response.data.message);
                        setLoader(false);
                    }
                })
                .catch(error => {
                    //console.log("errorerrorerror", error.response.data)
                    //Alert.alert('Error', error.response.data);
                    setErrorMsg(error.response.data);
                    //Alert(error.response.data);
                    setLoader(false);
                    // if (error?.response?.data) {
                    //     Alert(error?.response?.data);
                    //     //setErrorMsg(error.response.data);
                    // }
                });
        } else {
            setErrorMsg('Something went wrong');
        }
    };

    const PostStudentAttendanceApi = (transformedData) => {
        setModalMsg('');
        if (transformedData) {
            setLoader(true);
            const params = {
                DatabaseName: '',
            };
            //console.log("printtransformedDatatransformedData", JSON.stringify(transformedData))
            Api.postApi('DivisionAttendance/PostInsertDivisionAttendance', transformedData, params)
                .then(response => {
                    //console.log("postresponse:", JSON.stringify(response));
                    if (response.status === 200) {
                        setLoader(false);
                        setShowModal(true)
                        setModalMsg("Attendance Saved Successfully")
                        //console.log("finalpostresponse:", JSON.stringify(response.data));
                        //setStudentList(response.data);

                    } else {
                        Alert.alert("Error", response.data.message);
                        setLoader(false);
                    }
                })
                .catch(error => {
                    // console.log("error:", error?.response?.data);
                    // setErrorMsg(error?.response?.data || "Something went wrong");
                    //console.log("error:", error);
                    setModalMsg(error?.response?.data || "Something went wrong");
                    setLoader(false);
                });
        } else {
            setModalMsg('Something went wrong');
        }
    };

    const filteredStudents = studentList?.filter(student => {
        const query = searchQuery.toLowerCase();
        if (viewMode === 'name') {
            return student.studentName.toLowerCase().includes(query);
        } else if (viewMode === 'prn') {
            return student.prnno.toLowerCase().includes(query);
        }
        return false;
    });

    const renderItem = ({ item, index }) => {
        return (

            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    {viewMode === 'name' && (
                        <Text style={[styles.studentNameText, { borderRightWidth: 1, borderColor: colors.themeColor, padding: 10 }]}>
                            {index + 1}. {item.studentName}
                        </Text>
                    )}
                    {viewMode === 'prn' && (
                        <Text style={[styles.studentPrnText, { borderRightWidth: 1, borderColor: colors.themeColor, padding: 10 }]}>
                            {item.prnno}
                        </Text>
                    )}
                </View>

                <View style={{
                    flex: 0.368,
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <TouchableOpacity
                        style={[
                            styles.checkbox,
                            { backgroundColor: item.attendanceStatus === 'P' ? '#4CAF50' : '#F44336' }
                        ]}
                        onPress={() => toggleStatus(item.studentID)} // ✅ Pass studentID
                    >
                        <Icon
                            name={item.attendanceStatus === 'P' ? 'checkmark' : 'close'}
                            size={18}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };
    const transformAttendanceData = (students, facultyInfo, item, attendanceDate1) => {
        return students.map((student) => ({
            attendanceID: student.attendanceID || 0,  // agar API se aaya hai to wahi use karo, warna 0
            studentID: student.studentID,
            coursePartID: student.coursePartID,
            divisionID: student.divisionID,
            academicInstanceID: facultyInfo?.acdYrID,
            createdLoginID: facultyInfo?.sysUserID || 0, // yaha apne login ID set karo
            updatedLoginID: 0,
            attendanceStatus: student.attendanceStatus, // 'P' ya 'A'
            attendanceDate: moment(attendanceDate1).toISOString(),
            subjectID: item?.subjectID,
            deleteFlag: 'N',
        }));
    };

    return (
        <>
            {loader ? (
                <Loader visible={loader} />
            ) : (
                <View style={styles.container}>
                    {/* Header */}
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardRow}>
                            <View style={{ flex: 1, paddingRight: 10 }}>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    {item.courseShortName} {item.strCoursePartDescription}
                                </Text>
                                <Text numberOfLines={2} style={styles.subjectText}>
                                    {item.subjectName}
                                </Text>
                                <Text style={styles.subjectText}>
                                    {moment(attendanceDate1).format('DD/MMM/YYYY')}
                                </Text>
                                <Text style={styles.subjectText}>
                                    {item.divisionName !== '' ? item.divisionName : '----'}
                                </Text>
                            </View>

                            <View style={styles.codeBadge}>
                                <Text style={styles.codeText}>{item.subjectUniversityCode}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {showErorMsg !== '' && (
                        <Text style={styles.errorText}>{showErorMsg}</Text>
                    )}
                    {showModal &&
                        <ForgotPasswordModal
                            showModal={showModal}
                            closeModal={closeModal}
                            title="Message"
                            content={showModalMsg}
                            iconColor="black"
                        />
                    }
                    {studentList.length !== 0 &&
                        <>
                            <PaperTextInput
                                mode="outlined"
                                placeholder="Search by Name or PRN"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                style={styles.searchInput}
                                autoCapitalize="none"
                                right={<PaperTextInput.Icon icon="magnify" color={colors.themeColor} />}
                                theme={{
                                    colors: {
                                        primary: colors.themeColor,
                                        outline: colors.lightGrey,
                                    },
                                }}
                            />

                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <TouchableOpacity
                                    style={[
                                        styles.touchType,
                                        { backgroundColor: viewMode === 'prn' ? colors.themeColor : 'transparent' },
                                    ]}
                                    onPress={() => {
                                        setViewMode('prn');
                                        setOrderByPRN(1);
                                    }}>
                                    <Text
                                        style={[
                                            styles.touchTypeText,
                                            { color: viewMode === 'prn' ? '#fff' : '#555' },
                                        ]}>
                                        PRN
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.touchType,
                                        { backgroundColor: viewMode === 'name' ? colors.themeColor : 'transparent' },
                                    ]}
                                    onPress={() => {
                                        setViewMode('name');
                                        setOrderByPRN(2);
                                    }}>
                                    <Text
                                        style={[
                                            styles.touchTypeText,
                                            { color: viewMode === 'name' ? '#fff' : '#555' },
                                        ]}>
                                        NAME
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.touchType,
                                        { backgroundColor: '#00B72B' },
                                    ]}
                                    onPress={() => {
                                        //setViewMode('Submit');
                                        //setOrderByPRN(3);
                                        const transformedData = transformAttendanceData(studentList, facultyInfo, item, attendanceDate1);
                                        PostStudentAttendanceApi(transformedData)
                                        //console.log('Updated Attendance Array:', transformedData);
                                    }}>
                                    <Text
                                        style={[
                                            styles.touchTypeText,
                                            { color: viewMode === 'Submit' ? '#fff' : '#fff' },
                                        ]}>
                                        Submit
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.headerRow}>
                                <Text style={[styles.headerText, {
                                    flex: 1, padding: 10, borderRightWidth: 1, borderColor: colors.themeColor
                                }]}>
                                    {viewMode === 'name' ? 'NAME' : 'PRN NO'}
                                </Text>
                                <Text style={[styles.headerText, { flex: 0.4, textAlign: 'center' }]}>
                                    STATUS
                                </Text>
                            </View>

                            <FlatList
                                data={filteredStudents}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                contentContainerStyle={{ paddingBottom: 100 }} // space for button
                            />

                            {/* <TouchableOpacity
                                style={[styles.saveButton, {
                                    position: 'absolute',
                                    bottom: 20,
                                    alignSelf: 'center',
                                    width: '30%',
                                }]}
                                onPress={() => {
                                    //console.log('Updated Students:', studentList);
                                    const transformedData = transformAttendanceData(studentList, facultyInfo, item, attendanceDate1);
                                    PostStudentAttendanceApi(transformedData)
                                    //console.log('Updated Attendance Array:', transformedData);
                                }}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity> */}
                        </>}
                </View>

            )}
        </>
    );
};

export default ClassAttendanceEntryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#87CEEB',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 1,
        borderColor: colors.themeColor,
        justifyContent: 'center', alignItems: 'center',
    },
    headerText: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#000',
        fontSize: 14,
        flex: 1,
        textAlign: 'left',
    },
    searchContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#F4F4F4',
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    searchInput: {
        marginVertical: 10,
        height: 50,
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderColor: colors.themeColor,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1
    },
    studentPrnText: {
        fontSize: 13,
        fontFamily: 'Montserrat-SemiBold',
        color: '#000000',
        flex: 1,
    },
    studentNameText: {
        fontSize: 13,
        fontFamily: 'Montserrat-SemiBold',
        color: '#000000',
        flex: 1,
    },
    marksInput: {
        width: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: colors.black,
        fontSize: 12
    },
    saveButton: {
        backgroundColor: '#00B72B',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
    },
    saveButtonText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        textAlign: 'center'
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: colors.themeColor,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: 'transparent' // inactive ka default
    },
    toggleButtonActive: {
        backgroundColor: colors.themeColor
    },
    toggleButtonText: {
        fontWeight: 'bold',
    },
    touchType: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.themeColor,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        width: 100
    },
    touchTypeText: {
        color: colors.themeColor,
        fontFamily: 'Montserrat-Bold', fontSize: 16
    },
    card: {
        backgroundColor: colors.white,
        borderColor: colors.themeColor,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subjectBold: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
    },
    codeBadge: {
        backgroundColor: colors.themeColor,
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
    },
    codeText: {
        color: colors.white,
        fontSize: 12,
        fontFamily: 'Montserrat-Bold',
    },
    subjectText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: colors.black,
        textAlign: 'left',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold'
    },
    fabContainer: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        alignItems: 'flex-end',
    },
    fabButton: {
        flexDirection: 'row',
        backgroundColor: colors.themeColor,
        paddingHorizontal: 15,
        width: 100,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    fabText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 14,
    },
});
