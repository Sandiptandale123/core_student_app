import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput as PaperTextInput, Switch } from 'react-native-paper';
import colors from '../../utils/colors';
const studentsList = [
    { prn: '22356040001', name: 'Prajesh Shakya', status: '' },
    { prn: '22356040002', name: 'Rohit Patil', status: '' },
    { prn: '22356040003', name: 'Sneha Jadhav', status: '' },
    { prn: '22356040004', name: 'Amit Deshmukh', status: '' },
    { prn: '22356040005', name: 'Pooja More', status: '' },
    { prn: '22356040006', name: 'Ramesh Pawar', status: '' },
    { prn: '22356040007', name: 'Sonal Shinde', status: '' },
    { prn: '22356040008', name: 'Kunal Kadam', status: '' },
    { prn: '22356040009', name: 'Neha Kulkarni', status: '' },
    { prn: '22356040010', name: 'Vikram Gokhale', status: '' },
    { prn: '22356040011', name: 'Anjali Patil', status: '' },
    { prn: '22356040012', name: 'Suresh Joshi', status: '' },
    { prn: '22356040013', name: 'Manisha Desai', status: '' },
    { prn: '22356040014', name: 'Akash Mane', status: '' },
    { prn: '22356040015', name: 'Priya Chavan', status: '' },
    { prn: '22356040016', name: 'Deepak Sawant', status: '' },
    { prn: '22356040017', name: 'Komal Patankar', status: '' },
    { prn: '22356040018', name: 'Sachin Bhosale', status: '' },
    { prn: '22356040019', name: 'Meena Jagtap', status: '' },
    { prn: '22356040020', name: 'Nitin Shinde', status: '' },
];


const initialStudents = studentsList.map((student, index) => ({
    id: index.toString(),
    prn: student.prn,
    name: student.name,
    status: 'present',
}));

// Toggle status function
const toggleStatus = (id) => {
    setStudents(prevStudents =>
        prevStudents.map(student =>
            student.id === id
                ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
                : student
        )
    );
};
const StudentAttendanceScreen = props => {
    const { navigation } = props;
    //console.log("printitemname", JSON.stringify(item))
    const [searchText, setSearchText] = useState('');
    const [students, setStudents] = useState(initialStudents);
    const [viewMode, setViewMode] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const toggleStatus = (id) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.id === id
                    ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
                    : student
            )
        );
    };
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const filteredStudents = students.filter(student => {
        const query = searchQuery.toLowerCase();
        if (viewMode === 'name') {
            return student.name.toLowerCase().includes(query);
        } else if (viewMode === 'prn') {
            return student.prn.toLowerCase().includes(query);
        }
        return false;
    });

    const renderItem = ({ item }) => {
        const isPresent = item.status === 'present';
        return (
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    {viewMode === 'name' && (
                        <Text style={[styles.studentNameText, { borderRightWidth: 1, borderColor: '#ddd', padding: 10 }]}>
                            {item.name}
                        </Text>
                    )}
                    {viewMode === 'prn' && (
                        <Text style={[styles.studentPrnText, { borderRightWidth: 1, borderColor: '#ddd', padding: 10 }]}>
                            {item.prn}
                        </Text>
                    )}
                </View>

                <View style={{
                    flex: 0.37,
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <TouchableOpacity
                        style={[
                            styles.checkbox,
                            { backgroundColor: isPresent ? '#4CAF50' : '#F44336' }
                        ]}
                        onPress={() => toggleStatus(item.id)} // ✅ State change
                    >
                        <Icon
                            name={isPresent ? 'checkmark' : 'close'}
                            size={18}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            {/* Header */}
            <PaperTextInput
                mode="outlined"
                placeholder="Search by Name or PRN"
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
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
                <TouchableOpacity style={[styles.touchType, { backgroundColor: viewMode === 'name' ? colors.themeColor : 'transparent', }]}
                    onPress={() => {
                        setViewMode('name')
                    }}>
                    <Text
                        numberOfLines={1}
                        style={[styles.touchTypeText, { color: viewMode === 'name' ? '#fff' : '#555', }]}
                    >
                        NAME
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.touchType, { backgroundColor: viewMode === 'prn' ? colors.themeColor : 'transparent', }]}
                    onPress={() => {
                        setViewMode('prn')
                    }}>
                    <Text
                        numberOfLines={1}
                        style={[styles.touchTypeText, { color: viewMode === 'prn' ? '#fff' : '#555', }]}
                    >
                        PRN
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerRow}>
                <Text style={[styles.headerText, { flex: 1, borderRightWidth: 1, borderColor: '#ddd', padding: 10 }]}>{viewMode === 'name' ? 'NAME' : 'PRN NO'}</Text>
                <Text style={[styles.headerText, { flex: 0.4, textAlign: 'center', }]}>STATUS</Text>
            </View>

            <FlatList
                data={filteredStudents}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton}
                onPress={() => {
                    console.log('Updated Students:', students);
                    navigation.replace('Home');
                    // Optionally show alert also:
                    // Alert.alert('Saved', 'Marks updated successfully!');
                }}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StudentAttendanceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#87CEEB',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'center', alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 14,
        flex: 1,
        textAlign: 'left',
    },
    searchContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#F4F4F4',
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    searchInput: {
        marginVertical: 10,
        height: 50,
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderColor: '#ddd',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1
    },
    studentPrnText: {
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
        color: '#000000',
        flex: 1,
    },
    studentNameText: {
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
        color: '#000000',
        flex: 1,
    },
    marksInput: {
        width: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: colors.black,
        fontSize: 12
    },
    saveButton: {
        backgroundColor: '#00B72B',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        width: '40%',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 40
    },
    saveButtonText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        textAlign: 'center'
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: colors.themeColor,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: 'transparent' // inactive ka default
    },
    toggleButtonActive: {
        backgroundColor: colors.themeColor
    },
    toggleButtonText: {
        fontWeight: 'bold',
    },
    touchType: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.themeColor,
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        width: 100
    },
    touchTypeText: {
        color: colors.themeColor,
        fontFamily: 'Montserrat-Bold', fontSize: 16
    }
});
