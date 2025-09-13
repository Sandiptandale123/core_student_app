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
    const [paymentList, setPaymentList] = useState(null);
    const [showErorMsg, setErrorMsg] = useState('');
    const [showLoader, setLoader] = useState(false);
    useEffect(() => {
        fetchPaymentListApi();
    }, []);

    const fetchPaymentListApi = async () => {
        try {
            setErrorMsg('');
            if (!studentInfo?.studentID) {
                setErrorMsg('Student ID Not Found!');
                return;
            }

            setLoader(true);

            const params = {
                StudentID: studentInfo?.studentID,
                AcademicInstanceID: studentInfo?.academicInstanceID,
                DatabaseName: "",
            };

            const response = await Api.getApi(
                'OnlinePayment/GetStudentDetailsForAdmissionPayementListPage',
                params
            );
            setLoader(false);
            //console.log("API Response:", JSON.stringify(response?.data));

            if (response?.status === 200) {
                setPaymentList(response.data || []);
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
    //console.log("facultyBasicSubjectListfacultyBasicSubjectList", JSON.stringify(paymentList))
    const PaymentCard = ({ item }) => {
        return (
            <View
                style={styles.card}

            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{item.purposeName || "-"}</Text>
                    <View
                        style={[
                            styles.statusBadge,
                            { backgroundColor: item.paymentFlag === "Y" ? "#00B72B" : "#FF9800" },
                        ]}
                    >
                        <Text style={styles.statusText}>
                            {item.paymentFlag === "Y" ? "Paid" : "Unpaid"}
                        </Text>
                    </View>
                </View>

                {/* Body */}
                <View style={styles.body}>
                    {item.receiptNo > 0 ? (
                        <View style={styles.row}>
                            <Text style={styles.label}>Receipt No</Text>
                            <Text style={styles.value}>{String(item.receiptNo)}</Text>
                        </View>
                    ) : null}

                    {item.totalAmount !== null && item.totalAmount !== undefined ? (
                        <View style={styles.row}>
                            <Text style={styles.label}>Fees</Text>
                            <Text style={styles.value}>Rs.{String(item.totalAmount)}</Text>
                        </View>
                    ) : null}

                    {item.receiptDatestr ? (
                        <View style={styles.row}>
                            <Text style={styles.label}>Payment Date</Text>
                            <Text style={styles.value}>{item.receiptDatestr}</Text>
                        </View>
                    ) : null}
                </View>
                {/* Footer (Button) */}
                {item.paymentFlag === 'Y' && <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: '#025B8D' },
                    ]}
                    onPress={() => navigation.navigate('PaymentDetailsScreen', { item,studentInfo })}
                >
                    <Text style={styles.buttonText}>{'View Receipt'}</Text>
                </TouchableOpacity>
                }
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
                    {paymentList && paymentList[0] && <View style={styles.card1}>
                        <View style={styles.cardRow}>
                            <View style={{ flex: 1, paddingRight: 10 }}>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    Student Name: {paymentList[0].studentName}
                                </Text>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    PRN No: {paymentList[0].prnno}
                                </Text>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    {"Program Details"}
                                </Text>
                                <Text style={styles.subjectText}>
                                    {paymentList[0].courseName} - {paymentList[0].coursePartDescription}
                                </Text>
                            </View>
                        </View>
                    </View>
                    }
                    <FlatList
                        data={paymentList}
                        keyExtractor={(item, index) => String(item.admissionReceiptID ?? index)}
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
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 2,
    },
    label: {
        fontSize: 14,
        color: '#4F4F4F',
        fontFamily: 'Montserrat-Medium',
        flex: 1
    },
    value: {
        fontSize: 14,
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
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold'
    },
});
