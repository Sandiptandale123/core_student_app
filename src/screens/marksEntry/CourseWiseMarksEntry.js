import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../utils/colors';
import Loader from '../../components/Loader/Loader';
import moment from 'moment';
import { getFacultyBasicSubjectList } from '../../utils/serviceApi'; // 👈 service import

const CourseWiseMarksEntry = (props) => {
    const { navigation } = props;
    const { facultyInfo } = props.route.params;

    const [attendanceDate, setAttendanceDate] = useState(new Date());
    const formatDate = (date) => moment(date).format('DD/MMM/YYYY');
    const [facultyBasicSubjectList, setFacultyBasicSubjectList] = useState(null);
    const [showErorMsg, setErrorMsg] = useState('');
    const [showLoader, setLoader] = useState(false);

    useEffect(() => {
        loadFacultySubjects();
    }, [attendanceDate]);

    const loadFacultySubjects = async () => {
        setErrorMsg('');
        setLoader(true); // loader start

        if (!facultyInfo?.sysUserID) {
            setLoader(false);
            throw new Error("Something went wrong");
        } else {
            const params = {
                // ExaminstanceID: 36, // ya dynamic bhi kar sakte ho
                ExaminstanceID: parseInt(facultyInfo?.examInstID),
                LoggedUserId: parseInt(facultyInfo?.sysUserID),
            };

            try {
                const response = await getFacultyBasicSubjectList(params);
                setLoader(false);
                if (response.status === 200) {
                    //console.log("printfacultysubjectlist", JSON.stringify(response.data))
                    setFacultyBasicSubjectList(response.data);
                } else {
                    setErrorMsg(response.data.message || "Something went wrong");
                }
            } catch (error) {
                setLoader(false);
                if (error.response?.data?.message) {
                    setErrorMsg(error.response.data.message);
                } else {
                    setErrorMsg("Something went wrong");
                }
            }
        }
    };

    const timeout = (itemData, attendanceDate) => {
        navigation.navigate('MarksEntryScreen', {
            itemData,
            facultyInfo,
            showLoader: true
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
            onPress={() => timeout(item, attendanceDate)}
        >
            <View style={styles.cardRow}>
                <View style={{ flex: 1, paddingRight: 5 }}>
                    <Text style={[styles.subjectText, { fontFamily: 'Montserrat-Bold', textAlign: 'justify' }]}>
                        {item.courseName} - Sem {item.coursePartDescription}
                    </Text>
                    <Text style={styles.subjectText}>
                        {item.subjectName} - {item.categoryName} {item.paperName && <Text style={styles.subjectText}></Text>}
                    </Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={[styles.subjectText,]}>
                            Total Count = {item.totalStudent}
                        </Text>
                        <Text style={[styles.subjectText,]}>
                            Present Count = {item.presentStudent}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={[styles.subjectText,]}>
                            Ab/CC/DT Count = {item.abCCDtStudent}
                        </Text>
                        <Text style={[styles.subjectText,]}>
                            Pending Count = {item.pendingStudent}
                        </Text>
                    </View>
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
            ) : (
                <View style={[styles.container, { flexDirection: 'column' }]}>
                    {showErorMsg !== '' && (
                        <Text style={styles.errorText}>{showErorMsg}</Text>
                    )}
                    <View style={[styles.container, { paddingHorizontal: 0 }]}>
                        <FlatList
                            data={facultyBasicSubjectList}
                            keyExtractor={(item, index) => `${item.subjectID}-${index}`} // ✅ unique key
                            renderItem={renderFacultyItem}
                            initialNumToRender={15}
                            maxToRenderPerBatch={10}
                            windowSize={10}
                            removeClippedSubviews={false} // ❌ इसे false कर दो
                            extraData={facultyBasicSubjectList}
                            keyboardShouldPersistTaps="handled"
                            keyboardDismissMode="on-drag" // drag करने से keyboard hide
                            contentContainerStyle={{ paddingBottom: 100 }} // space for button
                        />

                    </View>
                </View>
            )}
        </>
    );
};

export default CourseWiseMarksEntry;

// 👇 Styles wahi rakhe hai
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        flex: 1,
    },
    card: {
        backgroundColor: '#F9F9F9',
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: colors.themeColor,
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
        padding: 2,
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
        fontSize: 12,
        color: colors.black,
        textAlign: 'left',
        flex: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold',
    },
});
