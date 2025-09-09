import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
const PaymentListScreen = props => {
    const { navigation } = props;
    const { studentInfo } = props.route.params;
    const feesData = [
        {
            id: 1,
            title: 'Admission Fees',
            amount: '₹ 50,000',
            receiptNo: '20',
            paymentDate: '08 Sep 2025',
            status: 'Paid',
            action: 'View Receipt',
        },
        {
            id: 2,
            title: 'Re-Exam Exit test Fees',
            amount: '₹ 5,000',
            receiptNo: null,
            paymentDate: null,
            status: 'Unpaid',
            action: 'Pay Now',
        },
        {
            id: 3,
            title: 'Admission Fees',
            amount: '₹ 30,000',
            receiptNo: '25',
            paymentDate: '05 Aug 2024',
            status: 'Paid',
            action: 'View Receipt',
        },
    ];

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
    // useEffect(() => {
    //     facultyBasicSubjectListApi();
    // }, [attendanceDate]);
    // const facultyBasicSubjectListApi = () => {
    //     setErrorMsg('');
    //     if (studentInfo?.studentID) {
    //         setLoader(true);
    //         const params = {
    //             ExaminerID: 36,
    //             AttendanceDate: moment(attendanceDate).format('DD/MMM/YYYY'),
    //             AcademicInstanceID: 15,
    //         };
    //         Api.getApi('BasicCourse/GetBasicSubjectListByExaminerID', params)
    //             .then(response => {
    //                 if (response.status === 200) {
    //                     setLoader(false);
    //                     setFacultyBasicSubjectList(response.data)
    //                 } else {
    //                     Alert(response.data.message);
    //                     setLoader(false);
    //                 }
    //             })
    //             .catch(error => {
    //                 setLoader(false);
    //                 if (error.response?.data?.message) {
    //                     setErrorMsg(error.response.data.message);
    //                 }
    //             });
    //     } else {
    //         setErrorMsg('Something went wrong');
    //     }
    // };
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

    const PaymentCard = ({ item }) => {
        return (
            <TouchableOpacity style={styles.card}
                onPress={() => {
                    navigation.navigate('PaymentDetailsScreen', { item });
                }}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View
                        style={[
                            styles.statusBadge,
                            { backgroundColor: item.status === 'Paid' ? '#00B72B' : '#FF9800' },
                        ]}
                    >
                        <Text style={styles.statusText}>
                            {item.status === 'Paid' ? 'Paid' : 'Unpaid'}
                        </Text>
                    </View>
                </View>

                {/* Body */}
                <View style={styles.body}>
                    {item.receiptNo && (<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.label}>Receipt No</Text>
                        <Text style={styles.value}>{item.receiptNo}</Text>
                    </View>
                    )}
                    {item.amount && (<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Text style={styles.label}>Fees</Text>
                        <Text style={styles.value}>{item.amount}</Text>
                    </View>
                    )}
                    {item.paymentDate && (<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.label}>Payment Date</Text>
                        <Text style={styles.value}>{item.paymentDate}</Text>
                    </View>
                    )}
                </View>

                {/* Footer (Button) */}
                {/* <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: item.status === 'Paid' ? '#025B8D' : '#056358' },
                    ]}
                >
                    <Text style={styles.buttonText}>{item.action}</Text>
                </TouchableOpacity> */}
            </TouchableOpacity>
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
                    <View style={styles.card1}>
                        <View style={styles.cardRow}>
                            <View style={{ flex: 1, paddingRight: 10 }}>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    Student Name: {"Sandip Tandale"}
                                </Text>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    PRN No: {"23264006"}
                                </Text>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    {"Program Details"}
                                </Text>
                                <Text style={styles.subjectText}>
                                    Bachelor of Computer Application - B.C.A SEM II
                                </Text>
                            </View>

                            {/* <View style={styles.codeBadge}>
                                <Text style={styles.codeText}>{"23264006"}</Text>
                            </View> */}
                        </View>
                    </View>
                    <FlatList
                        data={feesData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <PaymentCard item={item} />}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                </View>
            )}
        </>
    );
};

export default PaymentListScreen;

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
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
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
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#4F4F4F',
        marginBottom: 4,
        fontFamily: 'Montserrat-Medium',
        flex: 1
    },
    value: {
        color: '#4F4F4F',
        fontFamily: 'Montserrat-Medium',
        flex: 1
    },
    button: {
        borderRadius: 20,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
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
});
