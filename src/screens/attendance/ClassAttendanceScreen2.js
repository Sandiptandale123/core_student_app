import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckOptionModal from '../../components/Modals/CheckOptionModal';
import FilterModal from '../../components/Modals/FilterModal';
import colors from '../../utils/colors';
import { TextInput as PaperTextInput } from 'react-native-paper';
import Loader from '../../components/Loader/Loader';
import Api from '../../utils/Api';
const students = []; // You can replace this with student data
const studentNames = [
    'Prajesh Shakya',
    'Anjali Verma',
    'Rohit Sharma',
    'Neha Patil',
    'Amit Kumar',
    'Sneha Gupta',
    'Saurabh Yadav',
    'Kavita Joshi',
    'Vikas Mehta',
    'Pooja Singh',
    'Rahul Chauhan',
    'Divya Desai',
];

const initialStudents = studentNames.map((name, index) => ({
    id: index.toString(),
    name,
    status: index % 2 === 0 ? 'present' : 'absent',
}));
const ClassAttendanceScreen2 = props => {
    const { navigation } = props;
    const { programInfo } = props.route.params;
    console.log("programInfoprogramInfo", JSON.stringify(programInfo))
    const [showErorMsg, setErrorMsg] = useState('');
    const [showLoader, setLoader] = useState(false);
    const [facultyBasicSubjectList, setFacultyBasicSubjectList] = useState(null)
    // useEffect(() => {
    //     facultyBasicSubjectListApi();
    // }, []);
    // const facultyBasicSubjectListApi = () => {
    //     setErrorMsg('');
    //     if (facultyInfo?.examinerID) {
    //         setLoader(true);
    //         const params = {
    //             ExaminerID: parseInt(facultyInfo?.examinerID)
    //         };
    //         Api.getApi('BasicCourse/GetBasicSubjectListByExaminerID', params)
    //             .then(response => {
    //                 //console.log("GetBasicSubjectListByExaminerID", JSON.stringify(response))
    //                 if (response.status === 200) {
    //                     //console.log("GetBasicSubjectListByExaminerID", JSON.stringify(response.data))
    //                     setLoader(false);
    //                     //dispatch({ type: SET_USER, payload: response.data[0] });
    //                     setFacultyBasicSubjectList(response.data)
    //                     //timeout();
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


    const renderHeader = () => (
        <View style={styles.headerRow}>
            <Text style={[styles.headerText, { flex: 1, borderRightWidth: 1, padding: 5, borderColor: '#ddd' }]}>Program Name</Text>
            <Text style={[styles.headerText, { flex: 0.21, borderRightWidth: 1, borderColor: '#ddd', padding: 5 }]}>Sem/Part</Text>
            <Text style={[styles.headerText, { flex: 0.41, borderRightWidth: 1, borderColor: '#ddd', padding: 5 }]}>Course Name</Text>
            <Text style={[styles.headerText, { flex: 0.29, padding: 5 }]}>Course Code</Text>
        </View>
    );
    const [searchQuery, setSearchQuery] = useState('');
    const filteredBasicSubjectList = facultyBasicSubjectList?.filter(item =>
        item.courseShortName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            {showLoader ? (
                <Loader />
            ) : (
                <View style={styles.container}>
                    {showErorMsg !== '' && (
                        <Text style={styles.errorText}>{showErorMsg}</Text>
                    )}
            
                    <PaperTextInput
                        mode="outlined"
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={styles.searchInput}
                        right={<PaperTextInput.Icon icon="magnify" color={colors.themeColor} />}
                        theme={{
                            colors: {
                                primary: colors.themeColor,
                                outline: colors.lightGrey,// lighter outline makes it appear thinner
                            },
                        }}
                    />

                    {/* Placeholder List (Optional) */}
                    {/* <FlatList
                        data={filteredBasicSubjectList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.dataRow}>
                                <Text style={[styles.cellText, { flex: 1, borderRightWidth: 1, borderColor: '#ddd', padding: 5 }]}>{item.courseShortName}</Text>
                                <Text numberOfLines={2} style={[styles.cellText, { flex: 0.2, borderRightWidth: 1, borderColor: '#ddd', padding: 5 }]}>{item.coursePartDescription}</Text>
                                <Text style={[styles.cellText, { flex: 0.4, borderRightWidth: 1, borderColor: '#ddd', padding: 5 }]}>{item.subjectName}</Text>
                                <Text numberOfLines={2} style={[styles.cellText, { flex: 0.3, borderRightWidth: 1, borderColor: '#ddd', padding: 5 }]}>{item.subjectUniversityCode}</Text>
                            </View>
                        )}
                    /> */}
                   
                </View>
            )}
        </>
    );
};

export default ClassAttendanceScreen2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F4',
        padding: 10,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: colors.themeColor,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent:'center',
        alignItems:'center'
    },
    headerText: {
        flex: 1,
        color: 'white',
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    dataRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    cellText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 12,
        color: colors.black,
        fontFamily: 'Montserrat-Medium',
    },
    fabContainer: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        alignItems: 'flex-end',
    },
    fabButton: {
        flexDirection: 'row',
        backgroundColor: colors.themeColor,
        paddingHorizontal: 15,
        width: 100,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    fabText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 14,
    },
    fabAdd: {
        backgroundColor: colors.themeColor,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    plus: {
        color: '#ffffff',
        fontFamily: 'Montserrat-Medium',
        fontSize: 28,
        fontWeight: 'bold',
    },
    searchInput: {
        marginVertical: 20,
        height: 50,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Montserrat-SemiBold'
    },
});
