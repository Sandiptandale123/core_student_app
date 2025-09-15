import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
const ClassTimetableScreen = props => {
    const { navigation } = props;
    const { studentInfo } = props.route.params;
    console.log("printstudentinfo", JSON.stringify(studentInfo))
    const [classTimeTableList, setClassTimeTableList] = useState(null);
    const [showErorMsg, setErrorMsg] = useState('');
    const [showLoader, setLoader] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const onChangeFromDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (event.type === 'dismissed') {
            return;
        }
        if (selectedDate) {
            setFromDate(selectedDate);

            // अगर नया fromDate toDate से बड़ा है तो toDate भी reset कर दो
            if (selectedDate > toDate) {
                setToDate(selectedDate);
            }
        }
    };

    const onChangeToDate = (event, selectedDate) => {
        setShowToDatePicker(false);
        if (event.type === 'dismissed') {
            return;
        }
        if (selectedDate) {
            if (selectedDate < fromDate) {
                Alert.alert("Invalid Date", "To Date cannot be earlier than From Date");
                return;
            }
            setToDate(selectedDate);
        }
    };
    const formatDate = (date) => moment(date).format('DD/MMM/YYYY');
    useEffect(() => {
        fetchGetClassTimeTableListApi();
    }, [fromDate, toDate]);

    const fetchGetClassTimeTableListApi = async () => {
        try {
            setErrorMsg('');
            if (!studentInfo?.studentID) {
                setErrorMsg('Student ID Not Found!');
                return;
            }

            setLoader(true);

            const params = {
                //StudentID: studentInfo?.studentID,
                StudentID: 15000,
                FromDate: moment(fromDate).format('DD/MMM/YYYY'),
                ToDate: moment(toDate).format('DD/MMM/YYYY'),
                AcademicInstanceID: studentInfo?.academicInstanceID,
                ExamInstanceID: studentInfo?.examInstanceID,
            };
            //console.log("printparams", JSON.stringify(params))
            const response = await Api.getApi(
                'PreDivisionTimeTable/GetClassTimeTableListForStudentID',
                params
            );
            setLoader(false);
            //console.log("classtimetableAPI Response:", JSON.stringify(response?.data));

            if (response?.status === 200) {
                setClassTimeTableList(response.data || []);
            } else {
                setLoader(false);
                Alert.alert("Error", response?.data?.message || "Something went wrong");
            }
        } catch (error) {
            setLoader(false);
            console.error("API Error:", error);
            setErrorMsg(error?.response?.data?.message || "Failed to fetch data");
        }
    };
    //console.log("facultyBasicSubjectListfacultyBasicSubjectList", JSON.stringify(classTimeTableList))
    const ClassTimeTableCard = ({ item }) => {
        return (
            <View
                style={styles.card}
            >
                <View style={styles.row}>
                    <Text style={styles.label}>Day</Text>
                    <Text numberOfLines={2} style={styles.value}>{item.dayName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Slot Time</Text>
                    <Text numberOfLines={2} style={styles.value}>{item.slotTime} ({item.slotTypeDesc})</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Building Name</Text>
                    <Text numberOfLines={2} style={styles.value}>{item.blockNameDesc}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Room Name</Text>
                    <Text numberOfLines={2} style={styles.value}>{item.roomName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label,]}>Course</Text>
                    <Text numberOfLines={2} style={styles.value}>{item?.subjectName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.label,]}>Course Code</Text>
                    <Text numberOfLines={2} style={styles.value}>{item?.subjectUniversityCode}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Teacher</Text>
                    <Text numberOfLines={2} style={styles.value}>{item.examinerName}</Text>
                </View>
            </View>
        );
    };



    return (
        <>
            {showLoader ? (
                <Loader visible={showLoader} />
            ) : (
                <View style={[styles.container, { flexDirection: 'column' }]}>
                    {showErorMsg !== '' && (
                        <Text style={styles.errorText}>{showErorMsg}</Text>
                    )}
                    {classTimeTableList && classTimeTableList[0] && <View style={styles.card1}>
                        <View style={styles.cardRow}>
                            <View style={{ flex: 1, paddingRight: 10 }}>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    Student Name: {studentInfo?.firstName} {studentInfo?.middleName} {studentInfo?.lastName}
                                </Text>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    PRN No: {studentInfo?.prnno}
                                </Text>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    Program: {classTimeTableList[0].courseName}
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[styles.subjectText, { fontFamily: 'Montserrat-Bold', flex: 1 }]}>
                                        Sem/Part: {classTimeTableList[0].coursePartDescription}
                                    </Text>
                                    <Text style={[styles.subjectText, { fontFamily: 'Montserrat-Bold', flex: 1 }]}>
                                        Division: {classTimeTableList[0].divisionName}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    }
                    {showDatePicker && (
                        <DateTimePicker
                            style={{ color: '#000' }}
                            value={fromDate}
                            mode="date"
                            display="default"
                            onChange={onChangeFromDate}
                        />
                    )}
                    {showToDatePicker && (
                        <DateTimePicker
                            style={{ color: '#000' }}
                            value={toDate}
                            mode="date"
                            display="default"
                            onChange={onChangeToDate}
                            minimumDate={fromDate}
                        />
                    )}
                    {/* 📅 Date Range Filter */}
                    {/* 📅 Date Range Filter */}
                    <View style={styles.dateCard}>
                        <View style={styles.dateRow}>
                            <TouchableOpacity
                                style={styles.dateInput}
                                onPress={() => setShowDatePicker(true)}>
                                <Text style={styles.dateText}>{formatDate(fromDate)}</Text>
                                <Icon name="calendar" size={20} color={colors.themeColor} />
                            </TouchableOpacity>

                            <Text style={styles.toText}>to</Text>

                            <TouchableOpacity
                                style={styles.dateInput}
                                onPress={() => setShowToDatePicker(true)}>
                                <Text style={styles.dateText}>{formatDate(toDate)}</Text>
                                <Icon name="calendar" size={20} color={colors.themeColor} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                        data={classTimeTableList}
                        keyExtractor={(item, index) => String(item.subjectID ?? index)}
                        renderItem={({ item }) => <ClassTimeTableCard item={item} />}
                        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, marginTop: 20 }}>
                                <Text style={[styles.errorText, { fontSize: 18 }]}>
                                    Class Timetable Not Available
                                </Text>
                            </View>
                        )}
                    />
                </View>
            )}
        </>
    );
};

export default ClassTimetableScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    card: {
        backgroundColor: '#FFF8E8',
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#FFE39B',
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        color: '#025B8D',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
    },
    body: {
        marginVertical: 5,
    },
    row: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: 2,
    },
    label: {
        fontSize: 13,
        color: '#4F4F4F',
        fontFamily: 'Montserrat-Medium',
        flex: 0.6
    },
    value: {
        fontSize: 13,
        color: '#4F4F4F',
        fontFamily: 'Montserrat-Medium',
        flex: 1
    },
    button: {
        borderRadius: 15,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 15,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    card1: {
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
    subjectText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        color: colors.black,
        textAlign: 'left',
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
    dateCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    filterTitle: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color: colors.themeColor,
        marginBottom: 8,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    toText: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: '#666',
        marginHorizontal: 5,
    },
    dateInput: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    dateText: {
        color: colors.themeColor,
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold'
    },
});