import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckOptionModal from '../../components/Modals/CheckOptionModal';
import FilterModal from '../../components/Modals/FilterModal';
import colors from '../../utils/colors';
import { TextInput as PaperTextInput } from 'react-native-paper';
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
const ClassAttendanceScreen = props => {
    const { navigation } = props;
    const renderHeader = () => (
        <View style={styles.headerRow}>
            <Text style={[styles.headerText, { flex: 1 }]}>Student Name</Text>
            <Text style={[styles.headerText, { flex: 0.4 }]}>Present</Text>
            <Text style={[styles.headerText, { flex: 0.4 }]}>Absent</Text>
        </View>
    );
    const [menuVisible, setMenuVisible] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isCheckOptionVisible, setIsCheckOptionVisible] = useState(false);
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const filteredStudents = initialStudents.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return (
        <View style={styles.container}>
            {/* Table Header */}
            <PaperTextInput
                mode="outlined"
                placeholder="Search Student"
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

            {renderHeader()}
            <FilterModal
                visible={isFilterVisible}
                onClose={() => {
                    setIsFilterVisible(false),
                        navigation.navigate('StudentAttendanceScreen');
                }}
            />
            <CheckOptionModal
                visible={isCheckOptionVisible}
                onClose={() => {
                    setIsCheckOptionVisible(false),
                        navigation.navigate('CheckStudentAttendanceScreen');
                }}
            />
            {/* Placeholder List (Optional) */}
            <FlatList
                data={filteredStudents}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.dataRow}>
                        <Text style={[styles.cellText, { flex: 1, borderRightWidth: 1, borderColor: '#ddd', padding: 10 }]}>{item.name}</Text>
                        {/* <Text style={styles.cellText}>{item.status == 'present' ? '✔️' : ''}</Text>
                        <Text style={styles.cellText}>{item.status == 'absent' ? '✔️' : ''}</Text> */}
                        <TouchableOpacity
                            style={[
                                styles.checkbox,
                                { flex: 0.4, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: '#ddd', }, // green / red
                            ]}
                            onPress={() => toggleStatus(item.id)}
                        >
                            {item.status === 'present' && (
                                <Icon name="checkmark" size={18} color="white" style={{ backgroundColor: '#4CAF50', }} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.checkbox,
                                { flex: 0.4, justifyContent: 'center', alignItems: 'center' }, // green / red
                            ]}
                            onPress={() => toggleStatus(item.id)}
                        >
                            {item.status === 'absent' && (
                                <Icon name="close" size={18} color="white" style={{ backgroundColor: '#F44336', }} />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Floating Buttons */}
            <View style={styles.fabContainer}>
                {menuVisible && (
                    <>
                        <TouchableOpacity style={styles.fabButton}
                            onPress={() => setIsCheckOptionVisible(true)}>
                            <Icon name="checkmark-circle" size={16} color="white" />
                            <Text style={styles.fabText}>Check</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fabButton}
                            onPress={() => setIsFilterVisible(true)}>
                            <Icon name="filter" size={16} color="white" />
                            <Text style={styles.fabText}>Filter</Text>
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity style={styles.fabAdd} onPress={toggleMenu}>
                    <Text style={styles.plus}>{menuVisible ? '×' : '+'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ClassAttendanceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F4',
        padding: 10,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: colors.themeColor,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    headerText: {
        flex: 1,
        color: 'white',
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
        fontSize: 14,
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
});
