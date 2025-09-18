import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
import { useFocusEffect } from '@react-navigation/native';
import DropDownPicker from "react-native-dropdown-picker";
import moment from 'moment';
const MonthlyAttendanceScreen = props => {
    const { navigation } = props;
    const { studentInfo } = props.route.params;
    const [studentSubjectWiseAttendanceList, setStudentSubjectWiseAttendanceList] = useState(null);
    const [showErorMsg, setErrorMsg] = useState('');
    const [showLoader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(moment().month() + 1); // current month
    const [items, setItems] = useState([
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 },
    ]);

    useEffect(() => {
        if (value) {
            fetchStudentSubjectWiseAttendanceListApi(value);
        }
    }, [value]);

    const fetchStudentSubjectWiseAttendanceListApi = async (monthNo) => {
        try {
            setErrorMsg('');
            if (!studentInfo?.studentID) {
                setErrorMsg('Student ID Not Found!');
                return;
            }
            setLoader(true);
            const params = {
                StudentID: studentInfo?.studentID,
                //StudentID: 4270,
                AcademicInstanceID: studentInfo?.academicInstanceID,
                MonthNo: monthNo
            };
            const response = await Api.getApi(
                'DivisionAttendance/GetStudentSubjectWiseAttendanceListbyMonthNo',
                params
            );
            setLoader(false);
            if (response?.status === 200) {
                setStudentSubjectWiseAttendanceList(response.data || []);
            } else {
                setLoader(false);
                Alert.alert("Error", response?.data?.message || "Something went wrong");
            }
        } catch (error) {
            setLoader(false);
            setErrorMsg(error?.response?.data?.message || "Failed to fetch data");
        }
    };
    const StudentSubjectWiseAttendanceCard = ({ item }) => {
        return (
            <View
                style={styles.card}
            >
                <View style={styles.row}>
                    <Text style={[styles.label]}>Course Name</Text>
                    <Text numberOfLines={3} style={styles.value}>{item.subjectName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Course Code</Text>
                    <Text style={styles.value}>{item.subjectUniversityCode}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Total Lecture</Text>
                    <Text style={styles.value}>{item.totalLectureCount}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Present Lecture</Text>
                    <Text style={styles.value}>{item.presentLectureCount}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Absent Lecture</Text>
                    <Text style={styles.value}>{item.absentLectureCount}</Text>
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
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        listMode="SCROLLVIEW"   // <-- ये use करो
                        autoScroll              // <-- इससे select होने पर दुबारा खुलते समय उस position पर जाएगा
                        style={[styles.dropdown, { borderColor: 'gray', borderWidth: 1 }]} // border color + thickness
                        textStyle={{ fontSize: 16, color: '#000000', fontFamily: 'Montserrat-Medium' }} // text size + color
                        dropDownContainerStyle={[styles.dropdownContainer, { borderColor: 'gray' }]} // dropdown container border
                        onChangeValue={(val) => {
                            if (val) {
                                setValue(val);
                                fetchStudentSubjectWiseAttendanceListApi(val); // month बदलते ही API call
                            }
                        }}
                    />
                    <View style={{ marginVertical: 20 }}>
                        <FlatList
                            data={studentSubjectWiseAttendanceList}
                            keyExtractor={(item, index) => String(item.subjectID ?? index)}
                            renderItem={({ item }) => <StudentSubjectWiseAttendanceCard item={item} />}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            ListEmptyComponent={() => (
                                <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
                                    <Text style={{ fontSize: 16, color: '#000', fontFamily: 'Montserrat-Bold', }}>Data Not Found</Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
            )}
        </>
    );
};

export default MonthlyAttendanceScreen;

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
        alignItems: "flex-start",
        flexDirection: 'row',
        flex: 1,
        marginBottom: 2,
    },
    label: {
        fontSize: 14,
        color: '#4F4F4F',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'left',
        flex: 0.6,
    },
    value: {
        fontSize: 14,
        color: '#4F4F4F',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'left',
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
    dropdown: {
        borderColor: "#007AFF",
    },
    dropdownContainer: {
        borderColor: "#007AFF",
    },
});
