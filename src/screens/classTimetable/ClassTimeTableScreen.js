import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
const ClassTimeTableScreen = props => {
    const { navigation } = props;
    const { facultyInfo } = props.route.params;
    const [attendanceDate, setAttendanceDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (event.type === 'dismissed') {
            return;
        }
        if (selectedDate) {
            setAttendanceDate(selectedDate);
        }
    };
    const formatDate = (date) => moment(date).format('DD/MMM/YYYY');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [facultyBasicSubjectList, setFacultyBasicSubjectList] = useState(null);
    const [showErorMsg, setErrorMsg] = useState('');
    const [showLoader, setLoader] = useState(false);
    useEffect(() => {
        facultyBasicSubjectListApi();
    }, [attendanceDate]);
    const facultyBasicSubjectListApi = () => {
        setErrorMsg('');
        if (facultyInfo?.examinerID) {
            setLoader(true);
            const params = {
                ExaminerID: parseInt(facultyInfo?.examinerID),
                AttendanceDate: moment(attendanceDate).format('DD/MMM/YYYY'),
                AcademicInstanceID: parseInt(facultyInfo?.acdYrID),
            };
            Api.getApi('BasicCourse/GetBasicSubjectListByExaminerID', params)
                .then(response => {
                    if (response.status === 200) {
                        setLoader(false);
                        setFacultyBasicSubjectList(response.data)
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
            setErrorMsg('Something went wrong');
        }
    };
    const timeout = (item, attendanceDate) => {
        navigation.navigate('ClassAttendanceEntryScreen', {
            item,
            facultyInfo,
            showLoader: true,
            attendanceDate: attendanceDate
        });
    };
    useFocusEffect(
        React.useCallback(() => {
            setLoader(false);
        }, [])
    );
    const renderFacultyItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                timeout(item, attendanceDate)
            }}
        >
            <View style={styles.cardRow}>
                <View style={{ flex: 1, paddingRight: 5 }}>
                    <Text style={[styles.subjectText, { fontFamily: 'Montserrat-Bold',fontSize:11 }]}>
                        {item.courseShortName} - {item.strCoursePartDescription}
                    </Text>
                    <Text style={styles.subjectText}>
                        {item.subjectName}
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
    );


    return (
        <>
            {showLoader ? (
                <Loader visible={showLoader} />
            ) : (<View style={[styles.container, { flexDirection: 'column' }]}>
                {showDatePicker && (
                    <DateTimePicker
                        style={{ color: '#000' }}
                        value={attendanceDate}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        maximumDate={new Date()}
                    />
                )}
                {showErorMsg !== '' && (
                    <Text style={styles.errorText}>{showErorMsg}</Text>
                )}
                <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowDatePicker(true)}>
                    <Text style={{
                        color: colors.themeColor,
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 15
                    }}>{formatDate(attendanceDate)}</Text>
                    <Icon name="calendar" size={20} color={colors.themeColor} />
                </TouchableOpacity>

                <View style={[styles.container, { paddingHorizontal: 0, }]}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.dayText}> {days[attendanceDate.getDay()]}</Text>
                        <View style={styles.dateCircle}>
                            <Text style={styles.dateText}>{attendanceDate.getDate()}</Text>
                        </View>
                    </View>
                    <View style={styles.rightColumn}>
                        <FlatList
                            data={facultyBasicSubjectList}
                            renderItem={renderFacultyItem}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ paddingBottom: 100 }}
                        />
                    </View>
                </View>
            </View>
            )}
        </>
    );
};

export default ClassTimeTableScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        flex: 1,
    },
    leftColumn: {
        width: 50,
        alignItems: 'center',
        marginTop: 20,
    },
    todayTimeTableText: {
        color: '#828282',
        fontFamily: 'Montserrat-Medium',
        fontSize: 15
    },
    dayText: {
        color: colors.themeColor,
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
    dateCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.themeColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    dateText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
    rightColumn: {
        flex: 1,
        marginLeft: 5,
    },
    card: {
        backgroundColor: '#F9F9F9',
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: colors.themeColor,
        borderRightColor: colors.themeColor,
        borderLeftColor: colors.themeColor,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:2
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
        fontSize: 11,
        color: colors.black,
        textAlign: 'left',
        flex: 1
    },
    subSubject: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 10,
        color: colors.themeColor,
    },
    time: {
        color: colors.themeColor,
        marginTop: 4,
        fontFamily: 'Montserrat-Medium',
        fontSize: 11,
    },
    floatingContainer: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        alignItems: 'flex-end',
    },
    floatingButtonItem: {
        backgroundColor: colors.themeColor,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 3,
        width: 150
    },
    floatingText: {
        color: '#ffffff',
        fontFamily: 'Montserrat-Medium',
        fontSize: 13,
        textAlign: 'left'
    },
    plusButton: {
        backgroundColor: colors.themeColor,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    plus: {
        color: '#ffffff',
        fontFamily: 'Montserrat-Medium',
        fontSize: 28,
        fontWeight: 'bold',
    },
    dateInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: colors.black,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        height: 45,
        borderWidth: 0.5,
        borderColor: colors.themeColor,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold'
    },
});
