import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import colors from '../../utils/colors';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
const PaymentDetailsScreen = props => {
    const { navigation } = props;
    const { item, studentInfo } = props.route.params;
    const [facultyBasicSubjectList, setFacultyBasicSubjectList] = useState(null);
    const [showErorMsg, setErrorMsg] = useState('');
    const [showLoader, setLoader] = useState(false);
    useEffect(() => {
        fetchFacultyBasicSubjectList();
    }, []);

    const fetchFacultyBasicSubjectList = async () => {
        try {
            setErrorMsg('');
            if (!studentInfo?.studentID) {
                setErrorMsg('Please Enter Username and Password!');
                return;
            }
            setLoader(true);
            const params = {
                AdmissionReceiptID: item.admissionReceiptID,
                StudentID: studentInfo.studentID,
                AcademicInstanceID: studentInfo.academicInstanceID,
                DatabaseName: "",
            };

            const response = await Api.getApi(
                'OnlinePayment/GetReceiptDetailsForOnlinePayment',
                params
            );
            setLoader(false);
            //console.log("API Response:", JSON.stringify(response?.data));

            if (response?.status === 200) {
                setFacultyBasicSubjectList(response.data[0] || []);
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
                        {item && <View style={styles.cardRow}>
                            <View style={{ flex: 1, paddingRight: 10 }}>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    Student Name: {item?.studentName}
                                </Text>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    PRN No: {item?.prnno}
                                </Text>
                                <Text numberOfLines={2} style={[styles.subjectText, { fontFamily: 'Montserrat-Bold' }]}>
                                    {"Program Details"}
                                </Text>
                                <Text style={styles.subjectText}>
                                    {item?.courseName} - {item?.coursePartDescription}
                                </Text>
                            </View>

                            {/* <View style={styles.codeBadge}>
                                <Text style={styles.codeText}>{"23264006"}</Text>
                            </View> */}
                        </View>
                        }
                    </View>

                    <View style={styles.card}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.title}>{item.purposeName}</Text>
                        </View>

                        {/* Body */}
                        <View style={styles.body}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={styles.label}>Receipt Amount</Text>
                                <Text numberOfLines={1} style={styles.value}>₹ {facultyBasicSubjectList?.totalAmount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={styles.label}>Transaction No</Text>
                                <Text numberOfLines={1} style={styles.value}>{facultyBasicSubjectList?.txnID}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={styles.label}>Transaction Date</Text>
                                <Text numberOfLines={1} style={styles.value}>{facultyBasicSubjectList?.onlinePaymentConfirmDate}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={styles.label}>Bank Referenece No</Text>
                                <Text numberOfLines={1} style={styles.value}>{facultyBasicSubjectList?.bankRefereneceNo}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={styles.label}>Payment Mode</Text>
                                <Text numberOfLines={1} style={styles.value}>{facultyBasicSubjectList?.strPaymentMode}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: '#025B8D' },
                        ]}
                        onPress={() =>  navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>{'Back'}</Text>
                    </TouchableOpacity>

                </View>
            )}
        </>
    );
};

export default PaymentDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    card: {
        backgroundColor: '#CBEAFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CBEAFF',
        padding: 5,
        marginBottom: 15,
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
    label: {
        fontSize: 14,
        color: '#4F4F4F',
        fontFamily: 'Montserrat-Medium',
        flex: 0.8,
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
});
