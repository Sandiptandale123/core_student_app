import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { Calendar } from "react-native-calendars";
const HolidayListScreen = props => {
    const { navigation } = props;
    const { studentInfo } = props.route.params;
    //console.log("printstudentinfo", JSON.stringify(studentInfo))
    const [holidayList, setHolidayList] = useState(null);
    const [showErorMsg, setErrorMsg] = useState('');
    const [showLoader, setLoader] = useState(false);
    useEffect(() => {
        fetchHolidayListApi();
    }, []);

    const fetchHolidayListApi = async () => {
        try {
            setErrorMsg('');
            if (!studentInfo?.academicInstanceID) {
                setErrorMsg('Student academicInstanceID Not Found!');
                return;
            }
            setLoader(true);
            const params = {
                AcademicInstanceID: studentInfo?.academicInstanceID
            };
            //console.log("printparams", JSON.stringify(params))
            const response = await Api.getApi(
                'PreExaminerLeave/GetUpcomingHolidaysListByAcademicInstanceID',
                params
            );
            setLoader(false);
            //console.log("classtimetableAPI Response:", JSON.stringify(response?.data));

            if (response?.status === 200) {
                setHolidayList(response.data || []);
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
    //console.log("facultyBasicSubjectListfacultyBasicSubjectList", JSON.stringify(holidayList))
    const RenderHolidayList = ({ item }) => {
        return (
            <View style={styles.holidayRow}>
                {/* Left Circle */}
                <View style={styles.dateCircle}>
                    <Text style={styles.dayText}>{item.dateStr}</Text>
                </View>

                {/* Right Card */}
                <View style={styles.rightContent}>
                    <Text style={styles.holidayTitle}>{item.holidayDescription}</Text>
                    <Text style={styles.holidaySubText}>{item.monthStr},{item.dayNameStr}</Text>
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
                    <FlatList
                        data={holidayList}
                        keyExtractor={(item, index) => String(item.subjectID) + '_' + index}
                        renderItem={({ item }) => <RenderHolidayList item={item} />}
                        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, marginTop: 20 }}>
                                <Text style={[styles.errorText, { fontSize: 18 }]}>
                                    Holiday List Not Available
                                </Text>
                            </View>
                        )}
                    />
                </View>
            )}
        </>
    );
};

export default HolidayListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    dayText: {
        color: colors.white,
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
    },
  
    holidayRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
        paddingBottom:10
    },
    dateCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#BADAEF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    dayText: {
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        color: "#8F8446",
    },
    rightContent: {
        flex: 1,
    },
    holidayTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        color: "#1B1E28",
    },
    holidaySubText: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: "#7D848D",
        marginTop: 2,
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