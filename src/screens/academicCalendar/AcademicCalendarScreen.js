import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import colors from '../../utils/colors';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
import moment from 'moment';
import { Calendar } from "react-native-calendars";

const AcademicCalendarScreen = (props) => {
    const { studentInfo } = props.route.params;

    const [academicCalendarList, setAcademicCalendarList] = useState([]);
    const [showErrorMsg, setErrorMsg] = useState('');
    const [showLoader, setLoader] = useState(false);
    const today = moment().format('YYYY-MM-DD');
    const [selectedDates, setSelectedDates] = useState({
        [today]: { selected: true, marked: false, selectedColor: '#005f99' },
    });
    const [selectedDay, setSelectedDay] = useState(today);

    useEffect(() => {
        fetchAcademicCalendarListApi();
    }, []);

    const fetchAcademicCalendarListApi = async () => {
        try {
            setErrorMsg('');
            if (!studentInfo?.academicInstanceID) {
                setErrorMsg('Student academicInstanceID Not Found!');
                return;
            }

            setLoader(true);
            const params = { AcademicInstanceID: studentInfo.academicInstanceID };
            const response = await Api.getApi('StudentProfile/GetAcademicCalendarList', params);
            setLoader(false);

            if (response?.status === 200) {
                setAcademicCalendarList(response.data || []);
            } else {
                Alert.alert("Error", response?.data?.message || "Something went wrong");
            }
        } catch (error) {
            setLoader(false);
            console.error("API Error:", error);
            setErrorMsg(error?.response?.data?.message || "Failed to fetch data");
        }
    };

    const generateMarkedDates = () => {
        const marks = {};

        // har event ka fromDate green background ke saath
        academicCalendarList.forEach(item => {
            const date = moment(item.fromDate).format('YYYY-MM-DD');
            marks[date] = {
                ...(marks[date] || {}),
                selected: true,         // background ke liye selected use karenge
                selectedColor: '#00b300', // green background
                marked: false,
                dotColor: 'green',      // optional dot
            };
        });

        // highlight currently selected day in blue
        if (selectedDay) {
            marks[selectedDay] = {
                ...(marks[selectedDay] || {}),
                selected: true,
                selectedColor: '#005f99', // blue for selected day
            };
        }

        return marks;
    };

    // Filter list based on selected date
    const filteredCalendarList = academicCalendarList.filter(item => {
        const start = moment(item.fromDate);
        const end = moment(item.toDate);
        const selected = moment(selectedDay);
        return selected.isBetween(start, end, 'day', '[]'); // include start & end
    });

    const RenderAcademicCalendar = ({ item }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.label}>{item.calendarDescription}</Text>
                <Text style={styles.value}>{item.calendarRemarks}</Text>
                <Text style={styles.value}>{moment(item.fromDate).format('DD-MM-YYYY')} To {moment(item.toDate).format('DD-MM-YYYY')}</Text>
            </View>
        )
    };

    return (
        <>
            {showLoader ? (
                <Loader visible={showLoader} />
            ) : (
                <View style={styles.container}>
                    {showErrorMsg !== '' && (
                        <Text style={styles.errorText}>{showErrorMsg}</Text>
                    )}

                    <View style={{
                        borderRadius: 20,
                        overflow: 'hidden',
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowRadius: 5,
                        marginTop: 10,
                        marginBottom: 20,
                    }}>
                        <Calendar
                            current={today}
                            hideExtraDays={true}
                            theme={{
                                backgroundColor: '#cceeff',
                                calendarBackground: '#cceeff',
                                textSectionTitleColor: '#000',
                                todayTextColor: '#ff0000',
                                arrowColor: '#005f99',
                                monthTextColor: '#000',
                                textDayFontWeight: '500',
                                textMonthFontWeight: 'bold',
                            }}
                            markedDates={generateMarkedDates()}
                            onDayPress={(day) => setSelectedDay(day.dateString)}
                        />

                    </View>

                    <FlatList
                        data={filteredCalendarList}
                        keyExtractor={(item, index) => String(item.academicCalendarID) + '_' + index}
                        renderItem={({ item }) => <RenderAcademicCalendar item={item} />}
                        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, marginTop: 20 }}>
                                <Text style={[styles.errorText, { fontSize: 18 }]}>
                                    No Academic Events on this date
                                </Text>
                            </View>
                        )}
                    />
                </View>
            )}
        </>
    );
};

export default AcademicCalendarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    card: {
        backgroundColor: '#CBEAFF',
        borderRadius: 16,
        borderColor: '#FFE39B',
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'flex-start',
    },
    row: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 2,
    },
    label: {
        fontSize: 13,
        color: '#4F4F4F',
        fontFamily: 'Montserrat-Bold',
        flex: 0.6
    },
    value: {
        fontSize: 13,
        color: '#4F4F4F',
        fontFamily: 'Montserrat-Medium',
        flex: 1
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold'
    },
});
