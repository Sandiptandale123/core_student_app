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

const CheckOptionModal = ({ visible, onClose }) => {
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
                        <Text style={styles.modalTitle}>Check Option</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Program */}
                    <Text style={styles.label}>Program</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={program}
                            style={{ color: '#000' }}
                            onValueChange={(itemValue) => setProgram(itemValue)}>
                            <Picker.Item label="Select" value="" />
                            <Picker.Item label="BCA" value="bca" />
                            <Picker.Item label="BSc" value="bsc" />
                        </Picker>
                    </View>

                    {/* Semester */}
                    <Text style={styles.label}>Semester/Part</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={semester}
                            style={{ color: '#000' }}
                            onValueChange={(itemValue) => setSemester(itemValue)}>
                            <Picker.Item label="Select" value="" />
                            <Picker.Item label="1st" value="1" />
                            <Picker.Item label="2nd" value="2" />
                        </Picker>
                    </View>

                    {/* Division */}
                    <Text style={styles.label}>Division</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={division}
                            style={{ color: '#000' }}
                            onValueChange={(itemValue) => setDivision(itemValue)}>
                            <Picker.Item label="Select" value="" />
                            <Picker.Item label="A" value="A" />
                            <Picker.Item label="B" value="B" />
                        </Picker>
                    </View>

                    {/* Course Name */}
                    <Text style={styles.label}>Course Name<Text style={[styles.label, { color: 'red' }]}>*</Text></Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={courseName}
                            style={{ color: '#000' }}
                            onValueChange={(itemValue) => setCourseName(itemValue)}>
                            <Picker.Item label="Select" value="" />
                            <Picker.Item label="Math" value="math" />
                            <Picker.Item label="Computer" value="cs" />
                        </Picker>
                    </View>

                    {/* Attendance Date */}
                    <Text style={styles.label}>Attendance Date<Text style={[styles.label, { color: 'red' }]}>*</Text></Text>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowDatePicker(true)}>
                        <Text style={{color:colors.black}}>{attendanceDate.toLocaleDateString()}</Text>
                        <Icon name="calendar" size={20} color={colors.black} />
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            style={{ color: '#000' }}
                            value={attendanceDate}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}

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

export default CheckOptionModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'flex-end',
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
        color:colors.black,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        height: 50
    },
    findButton: {
        backgroundColor: colors.themeColor,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 50,
        width: '80%'
    },

    findButtonText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    },

});
