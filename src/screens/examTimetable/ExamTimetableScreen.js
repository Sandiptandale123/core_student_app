import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import colors from '../../utils/colors';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
import { useFocusEffect } from '@react-navigation/native';

const ExamTimetableScreen = props => {
    const { studentInfo } = props.route.params;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const [studentExamHallTicketTimeTableList, setStudentExamHallTicketTimeTableList] = useState([]);

    const [showErorMsg, setErrorMsg] = useState('');
    const [showLoader, setLoader] = useState(false);

    useEffect(() => {
        studentExamHallTicketTimeTableListApi();
    }, []);

    const studentExamHallTicketTimeTableListApi = () => {
        setErrorMsg('');
        if (studentInfo?.studentID) {
            setLoader(true);
            const params = {
                StudentID: parseInt(studentInfo?.studentID),
                ExamInstanceID: parseInt(studentInfo?.examInstanceID),
            };
            Api.getApi('PreDivisionTimeTable/GetStudentExamHallTicketTimeTableListForStudentID', params)
                .then(response => {
                    if (response.status === 200) {
                        setLoader(false);
                        setStudentExamHallTicketTimeTableList(response.data);
                    } else {
                        Alert.alert(response.data.message);
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

    const renderFacultyItem = ({ item }) => {
        const examDate = new Date(item.examStartDateTime);

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <View style={styles.leftColumn}>
                    <Text style={styles.dayText}>{days[examDate.getDay()]}</Text>
                    <View style={styles.dateCircle}>
                        <Text style={[styles.dateText, { fontSize: 10 }]}>{examDate.getDate()}</Text>
                        <Text style={[styles.dateText, { fontSize: 10 }]}>{months[examDate.getMonth()]}</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.card, { flex: 1 }]}>
                    <View style={styles.cardRow}>
                        <View style={{ flex: 1, paddingRight: 5 }}>
                            <Text style={[styles.subjectText, { fontFamily: 'Montserrat-Bold', fontSize: 12, marginBottom: 2 }]}>
                                {item.subjectName}
                            </Text>
                            <Text style={styles.subjectText}>
                                Exam Time : {item.startTime} - {item.endTime}
                            </Text>
                        </View>
                        <View style={styles.codeBadge}>
                            <Text style={styles.codeText}>{item.subjectUniversityCode}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            {showLoader ? (
                <Loader visible={showLoader} />
            ) : (
                <View style={[styles.container, { flexDirection: 'column' }]}>
                    {showErorMsg !== '' && <Text style={styles.errorText}>{showErorMsg}</Text>}

                    {studentExamHallTicketTimeTableList?.length > 0 && (
                        <View style={styles.card1}>
                            <View style={styles.cardRow}>
                                <View style={{ flex: 1, paddingRight: 10 }}>
                                    <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                        Student Name : {studentInfo.firstName} {studentInfo.middleName} {studentInfo.lastName}
                                    </Text>
                                    <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                        Seat Number : {studentExamHallTicketTimeTableList[0]?.studentSeatNO}
                                    </Text>
                                    <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                        Program : {studentExamHallTicketTimeTableList[0]?.courseName}
                                    </Text>
                                    <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                        Sem / Part : {studentExamHallTicketTimeTableList[0]?.coursePartDescription}
                                    </Text>
                                    <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                        Exam Instance : {studentExamHallTicketTimeTableList[0]?.examInstanceRemark}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}


                    <View style={[styles.container, { paddingHorizontal: 0 }]}>
                        <FlatList
                            data={studentExamHallTicketTimeTableList}
                            renderItem={renderFacultyItem}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ paddingBottom: 100 }}
                            ListEmptyComponent={() => (
                                <View style={{ flex: 1, marginTop: 20 }}>
                                    <Text style={[styles.errorText, { fontSize: 18 }]}>
                                        Student Exam Hall Ticket Timetable is Not Available
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
            )}
        </>
    );
};

export default ExamTimetableScreen;

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
        marginTop: -5,
    },
    dayText: {
        color: colors.themeColor,
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
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
        padding: 2,
    },
    dateCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.themeColor,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderWidth: 1,
        borderColor: colors.themeColor,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    codeBadge: {
        backgroundColor: colors.themeColor,
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 10,
        flex: 0.25,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold',
    },
});
