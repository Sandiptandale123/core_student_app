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

const FilterModal = ({ visible, onClose, onFind, subjectData }) => {
    const [program, setProgram] = useState('');
    const [semester, setSemester] = useState('');
    const [division, setDivision] = useState('');
    const [courseName, setCourseName] = useState('');
    const [attendanceDate, setAttendanceDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    //console.log("printparamsitem", subjectData)
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
                        <Text style={styles.modalTitle}>Filter Option</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Program */}
                    <Text style={styles.label}>Program</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={subjectData?.courseShortName || ""}
                            style={{ color: '#000' }}
                            enabled={false} // disable editing
                        >
                            <Picker.Item label={subjectData?.courseShortName || "Select"} value={subjectData?.courseShortName || ""} />
                        </Picker>
                    </View>

                    {/* Semester */}
                    <Text style={styles.label}>Semester/Part</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={subjectData?.coursePartDescription || ""}
                            style={{ color: '#000' }}
                            enabled={false} // disable editing
                        >
                            <Picker.Item label={subjectData?.coursePartDescription || "Select"} value={subjectData?.coursePartDescription || ""} />
                        </Picker>
                    </View>
                    {/* Course Name */}
                    <Text style={styles.label}>Course Name<Text style={[styles.label, { color: 'red' }]}>*</Text></Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={subjectData?.subjectName || ""}
                            style={{ color: '#000' }}
                            enabled={false} // disable editing
                        >
                            <Picker.Item label={subjectData?.subjectName || "Select"} value={subjectData?.subjectName || ""} />
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
                    {/* Attendance Date */}
                    <Text style={styles.label}>Attendance Date<Text style={[styles.label, { color: 'red' }]}>*</Text></Text>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowDatePicker(true)}>
                        <Text style={{ color: colors.black }}>{attendanceDate.toLocaleDateString()}</Text>
                        <Icon name="calendar" size={20} color={colors.black} />
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
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
                            onFind(); // optional: close modal after find
                        }}>
                        <Text style={styles.findButtonText}>Find</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

export default FilterModal;

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
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        height: 50
    },
    findButton: {
        backgroundColor: '#00B72B',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        width: '40%',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 40
    },

    findButtonText: {
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        textAlign: 'center'
    },
});
