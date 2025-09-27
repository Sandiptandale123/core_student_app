import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import colors from '../../utils/colors';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
import moment from 'moment';
import { Calendar } from "react-native-calendars";

const NotificationsScreen = (props) => {
    const { studentInfo } = props.route.params;
    const [notificationsList, setNotificationsList] = useState([]);
    const [showErrorMsg, setErrorMsg] = useState('');
    const [showLoader, setLoader] = useState(false);

    useEffect(() => {
        fetchNotificationsListApi();
    }, []);

    const fetchNotificationsListApi = async () => {
        try {
            setErrorMsg('');
            if (!studentInfo?.academicInstanceID) {
                setErrorMsg('Student academicInstanceID Not Found!');
                return;
            }

            setLoader(true);
            const params = {
                AcademicInstanceID: studentInfo.academicInstanceID,
                ExamInstanceID: studentInfo.examInstanceID,
                NotificationType: 'S'
            };
            const response = await Api.getApi('Circulars/GetNotificationsByAcademicinsatnceID', params);
            setLoader(false);

            if (response?.status === 200) {
                setNotificationsList(response.data || []);
            } else {
                Alert.alert("Error", response?.data?.message || "Something went wrong");
            }
        } catch (error) {
            setLoader(false);
            console.error("API Error:", error);
            setErrorMsg(error?.response?.data?.message || "Failed to fetch data");
        }
    };


    const RenderNotificationList = ({ item }) => {
        return (
            <View style={styles.card}>
                <Text style={styles.label}>{item.heading}</Text>
                <Text style={styles.value}>{item.description}</Text>
                <Text style={styles.value}>{moment(item.fromDate).format('DD-MM-YYYY')}</Text>
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
                    <FlatList
                        data={notificationsList}
                        keyExtractor={(item, index) => String(item.notificationID) + '_' + index}
                        renderItem={({ item }) => <RenderNotificationList item={item} />}
                        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, marginTop: 20 }}>
                                <Text style={[styles.errorText, { fontSize: 18 }]}>
                                    No Data Found
                                </Text>
                            </View>
                        )}
                    />
                </View>
            )}
        </>
    );
};

export default NotificationsScreen;

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
        fontSize: 15,
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
