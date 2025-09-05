import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker'; // npm install @react-native-picker/picker
import DateTimePicker from '@react-native-community/datetimepicker'; // npm install @react-native-community/datetimepicker
import colors from '../../utils/colors';

const MarksEntryModal = ({ visible, onClose }) => {
    const [program, setProgram] = useState('');
    const [semester, setSemester] = useState('');
    const [division, setDivision] = useState('');
    const [courseName, setCourseName] = useState('');
    const [attendanceDate, setAttendanceDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setAttendanceDate(selectedDate);
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Marks entry</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={24} color={colors.themeColor} />
                        </TouchableOpacity>
                    </View>

                    {/* Program */}
                    <Text style={styles.label}>Course Name</Text>
                    <TextInput
                        style={[styles.inputBox, { marginTop: 10 }]}
                        placeholder="Concepts of color Theory (Assignment 1-50)"
                        placeholderTextColor={colors.lightGrey}
                    // value={pendingStudent}
                    // onChangeText={setPendingStudent}
                    />
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 10, }}>
                            <Text style={[styles.label,]}>Division</Text>
                            <TextInput
                                style={[styles.inputBox, { marginTop: 5 }]}
                                placeholder="A"
                                placeholderTextColor={colors.lightGrey}
                            // value={maxMark}
                            // onChangeText={setMaxMark}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.label}>Sem/Part<Text style={[styles.label, { color: 'red' }]}>*</Text></Text>
                            <TextInput
                                style={[styles.inputBox, { marginTop: 5 }]}
                                placeholder="6th"
                                placeholderTextColor={colors.lightGrey}
                            // value={totalStudent}
                            // onChangeText={setTotalStudent}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 10, }}>
                            <Text style={[styles.label,]}>Category</Text>
                            <TextInput
                                style={[styles.inputBox, { marginTop: 5 }]}
                                placeholder="Theory"
                                placeholderTextColor={colors.lightGrey}
                            // value={maxMark}
                            // onChangeText={setMaxMark}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.label}>Paper</Text>
                            <TextInput
                                style={[styles.inputBox, { marginTop: 5 }]}
                                placeholder="CIE"
                                placeholderTextColor={colors.lightGrey}
                            // value={totalStudent}
                            // onChangeText={setTotalStudent}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 10, }}>
                            <Text style={[styles.label,]}>Evalution Method</Text>
                            <TextInput
                                style={[styles.inputBox, { marginTop: 5 }]}
                                placeholder="Assignment 1"
                                placeholderTextColor={colors.lightGrey}
                            // value={maxMark}
                            // onChangeText={setMaxMark}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.label}>Max.Marks </Text>
                            <TextInput
                                style={[styles.inputBox, { marginTop: 5 }]}
                                placeholder="40"
                                placeholderTextColor={colors.lightGrey}
                            // value={totalStudent}
                            // onChangeText={setTotalStudent}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.findButton}
                        onPress={() => {
                            // handle your filter submit logic here
                            onClose(); // optional: close modal after find
                        }}>
                        <Text style={styles.findButtonText}>Find</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

export default MarksEntryModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'flex-end',
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        height: 50,
        fontSize: 14,
        color: colors.black
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 10,
        maxHeight: '88%',
        height: '88%', // increased height
    },
    row: {
        flexDirection: 'row',
        marginTop: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        color: '#433636',
    },
    label: {
        marginTop: 10,
        fontSize: 14,
        color: '#000000',
        fontFamily: 'Montserrat-Medium',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        height: 50
    },
    dateInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        height: 50
    },
    findButton: {
        backgroundColor: '#77C9F5',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
        width: '60%',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 50
    },

    findButtonText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        textAlign: 'center'
    },

});
