import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
    FlatList,
    ImageBackground,
    Dimensions,
    Keyboard,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Animated,
    I18nManager,
    Alert,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Modal from 'react-native-modal';
import { RadioButton, TextInput } from 'react-native-paper';
function PopupModal({
    isModalVisible,
    cancelModal,
    toggleModal,
    data,
    isHealthIssueModalVisible,
    isAddActivityModalVisible,
    isAddExercise1ModalVisible,
    isAddExercise2ModalVisible
}) {
    const renderTimeItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: index === select ? '#2F8C88' : '#FFFFFF',
                    marginHorizontal: 10,
                    marginVertical: 5,
                    borderColor: '#b3b3b3',
                    borderWidth: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    {
                        setSelect(index), setTimeData(item);
                        //toggleModal()
                    }
                }}>
                <Text
                    style={{
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 12,
                        color: index === select ? '#FFFFFF' : '#9C9C9C',
                    }}>
                    {item.slot}
                </Text>
            </TouchableOpacity>
        );
    };
    const [openI, setOpenI] = useState(false);
    const [valueI, setValueI] = useState(null);
    const [itemsI, setItemsI] = useState(data);
    const [exerciseMappingInfo, setExerciseMappingInfo] = useState({
        exerciseName: '',
        yesNoValue: 1
    });
    const [activityMappingInfo, setActivityMappingInfo] = useState({
        activityName: '',
        typeIntensity: 1,
        days: '',
        duration: ''
    });
    const [addExerciseInfo, setAddExerciseInfo] = useState({
        wExeName: '',
        Reps: "",
        Set: '',
        Weight: '',
        remark: ''
    });
    const [addExercise2Info, setAddExercise2Info] = useState({
        exeName: '',
        time: "",
        remark: ''
    });
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(activityMappingInfo?.typeIntensity);
    const [genderItems, setGenderItems] = useState([
        { label: 'Select', value: 0 },
        { label: 'Low', value: 1 },
        { label: 'Moderate', value: 2 },
        { label: 'High', value: 3 },
    ]);
    return (
        <View style={styles.container}>
            {isModalVisible ? (
                <Modal isVisible={isModalVisible} >
                    <View style={[styles.modalContent,]}>
                        <View style={{ zIndex: 3000 }}>
                            <DropDownPicker
                                open={openI}
                                value={valueI}
                                items={itemsI}
                                setOpen={setOpenI}
                                setValue={setValueI}
                                setItems={setItemsI}
                                placeholder="Select an option..."
                                style={styles.dropdown}
                                dropDownContainerStyle={styles.dropdownContainer}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={{ backgroundColor: 'blue', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}>
                                <Text style={{ marginHorizontal: 5, color: 'white' }} onPress={() => {
                                    toggleModal(valueI);
                                    setValueI(null)
                                    //toggleModal()
                                }
                                } >Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}
                                onPress={cancelModal}>
                                <Text style={{ marginHorizontal: 5, color: 'white' }} onPress={cancelModal} >
                                    Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            ) : isHealthIssueModalVisible ? (
                <Modal isVisible={isHealthIssueModalVisible} >
                    <View style={[styles.modalContent1, { height: 350 }]}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add Exercise</Text>
                            <TouchableOpacity onPress={cancelModal}>
                                <Text style={styles.closeButton}>&times;</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                label={
                                    <Text>
                                        Exercise Name <Text style={styles.asterisk}>*</Text>
                                    </Text>
                                }
                                value={exerciseMappingInfo.exerciseName}
                                onChangeText={text =>
                                    setExerciseMappingInfo({ ...exerciseMappingInfo, exerciseName: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input, { height: 100 }]}
                                mode='outlined'
                                multiline={true}
                                placeholder="Exercise Name..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />

                            <View style={{ flexDirection: 'row', }}>
                                <RadioButton.Group
                                    onValueChange={newValue => {
                                        console.log("newvalue", newValue)
                                        setExerciseMappingInfo({ ...exerciseMappingInfo, yesNoValue: newValue })
                                    }
                                    }
                                    // value={clientInfo.isActive}
                                    value={exerciseMappingInfo.yesNoValue}
                                >
                                    <View style={styles.row1}>
                                        <View style={styles.radioGroup1}>
                                            <RadioButton value={1} />
                                            <Text>Yes</Text>
                                        </View>
                                        <View style={styles.radioGroup1}>
                                            <RadioButton value={2} />
                                            <Text>No</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={{ backgroundColor: '#ECAC4A', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}>
                                <Text style={{ marginHorizontal: 5, color: 'white', fontSize: 18, fontFamily: 'Montserrat-Medium' }} onPress={() => {
                                    // toggleModal(valueI);
                                    // setValueI(null)
                                    //cancelModal
                                    toggleModal(exerciseMappingInfo)
                                    setExerciseMappingInfo({ ...exerciseMappingInfo, exerciseName: '', yesNoValue: 1 })
                                }
                                } >Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: '#7E93A8', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}
                                onPress={cancelModal}>
                                <Text style={{ marginHorizontal: 5, color: 'white', fontSize: 18, fontFamily: 'Montserrat-Medium' }} onPress={cancelModal} >
                                    Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            ) : isAddActivityModalVisible ? (
                <Modal isVisible={isAddActivityModalVisible} >
                    <View style={[styles.modalContent1, { height: 450 }]}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add Activity</Text>
                            <TouchableOpacity onPress={cancelModal}>
                                <Text style={styles.closeButton}>&times;</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                label={
                                    <Text>
                                        Activity Name <Text style={styles.asterisk}>*</Text>
                                    </Text>
                                }
                                value={activityMappingInfo.activityName}
                                onChangeText={text =>
                                    setActivityMappingInfo({ ...activityMappingInfo, activityName: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input,]}
                                mode='outlined'
                                placeholder="Exercise Name..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />
                            <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Medium', marginLeft: 10, marginBottom: 5 }}>Type/Intensity</Text>
                            <Dropdown
                                style={[styles.dropdown1, isFocus && { borderColor: '#ECAC4A', backgroundColor: '#FFFFFF' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={genderItems}
                                // search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select' : 'Select'}
                                //searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setActivityMappingInfo({ ...activityMappingInfo, typeIntensity: item.value })
                                    //setClientInfo({ ...clientInfo, fkgenderId: item.value })
                                    setIsFocus(false);
                                }}
                            />

                            <TextInput
                                label={
                                    <Text>
                                        Days <Text style={styles.asterisk}>*</Text>
                                    </Text>
                                }
                                value={activityMappingInfo.days}
                                onChangeText={text =>
                                    setActivityMappingInfo({ ...activityMappingInfo, days: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input,]}
                                mode='outlined'
                                placeholder="Days..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />
                            <TextInput
                                label={
                                    <Text>
                                        Duration <Text style={styles.asterisk}>*</Text>
                                    </Text>
                                }
                                value={activityMappingInfo.duration}
                                onChangeText={text =>
                                    setActivityMappingInfo({ ...activityMappingInfo, duration: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input,]}
                                mode='outlined'
                                placeholder="Duration..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={{ backgroundColor: '#ECAC4A', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}>
                                <Text style={{ marginHorizontal: 5, color: 'white', fontSize: 18, fontFamily: 'Montserrat-Medium' }} onPress={() => {
                                    // toggleModal(valueI);
                                    // setValueI(null)
                                    //cancelModal
                                    toggleModal(activityMappingInfo)
                                }
                                } >Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: '#7E93A8', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}
                                onPress={cancelModal}>
                                <Text style={{ marginHorizontal: 5, color: 'white', fontSize: 18, fontFamily: 'Montserrat-Medium' }} onPress={cancelModal} >
                                    Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            ) : isAddExercise1ModalVisible ? (
                <Modal isVisible={isAddExercise1ModalVisible} >
                    <View style={[styles.modalContent1, { height: 500 }]}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add Exercise</Text>
                            <TouchableOpacity onPress={cancelModal}>
                                <Text style={styles.closeButton}>&times;</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 5 }}>
                            <TextInput
                                label={
                                    <Text>
                                        Exercise Name <Text style={styles.asterisk}>*</Text>
                                    </Text>
                                }
                                value={addExerciseInfo.wExeName}
                                onChangeText={text =>
                                    setAddExerciseInfo({ ...addExerciseInfo, wExeName: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input,]}
                                mode='outlined'
                                placeholder="Exercise Name..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />
                            <TextInput
                                label={
                                    <Text>
                                        Reps
                                    </Text>
                                }
                                value={addExerciseInfo.Reps}
                                onChangeText={text =>
                                    setAddExerciseInfo({ ...addExerciseInfo, Reps: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                keyboardType='number-pad'
                                maxLength={10}
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input,]}
                                mode='outlined'
                                placeholder="Reps..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />

                            <TextInput
                                label={
                                    <Text>
                                        Set
                                    </Text>
                                }
                                value={addExerciseInfo.Set}
                                onChangeText={text =>
                                    setAddExerciseInfo({ ...addExerciseInfo, Set: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                keyboardType='number-pad'
                                maxLength={10}
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input,]}
                                mode='outlined'
                                placeholder="Set..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />
                            <TextInput
                                label={
                                    <Text>
                                        Weight
                                    </Text>
                                }
                                value={addExerciseInfo.Weight}
                                onChangeText={text =>
                                    setAddExerciseInfo({ ...addExerciseInfo, Weight: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                keyboardType='number-pad'
                                maxLength={10}
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input,]}
                                mode='outlined'
                                placeholder="Weight..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />
                            <TextInput
                                label={
                                    <Text>
                                        Remark
                                    </Text>
                                }
                                value={addExerciseInfo.remark}
                                onChangeText={text =>
                                    setAddExerciseInfo({ ...addExerciseInfo, remark: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input,]}
                                mode='outlined'
                                placeholder="Remark..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />
                        </View>
                        <View style={[styles.buttonContainer, { marginTop: 0 }]}>
                            <TouchableOpacity style={{ backgroundColor: '#ECAC4A', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}>
                                <Text style={{ marginHorizontal: 5, color: 'white', fontSize: 18, fontFamily: 'Montserrat-Medium' }} onPress={() => {
                                    // toggleModal(valueI);
                                    // setValueI(null)
                                    //cancelModal
                                    toggleModal(addExerciseInfo)
                                }
                                } >Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: '#7E93A8', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}
                                onPress={cancelModal}>
                                <Text style={{ marginHorizontal: 5, color: 'white', fontSize: 18, fontFamily: 'Montserrat-Medium' }} onPress={cancelModal} >
                                    Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            ) : isAddExercise2ModalVisible ? (
                <Modal isVisible={isAddExercise2ModalVisible} >
                    <View style={[styles.modalContent1, { height: 350 }]}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add Exercise</Text>
                            <TouchableOpacity onPress={cancelModal}>
                                <Text style={styles.closeButton}>&times;</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 5 }}>
                            <TextInput
                                label={
                                    <Text>
                                        Exercise Name <Text style={styles.asterisk}>*</Text>
                                    </Text>
                                }
                                value={addExercise2Info.exeName}
                                onChangeText={text =>
                                    setAddExercise2Info({ ...addExercise2Info, exeName: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input,]}
                                mode='outlined'
                                placeholder="Exercise Name..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />

                            <TextInput
                                label={
                                    <Text>
                                        Time
                                    </Text>
                                }
                                value={addExercise2Info.time}
                                onChangeText={text =>
                                    setAddExercise2Info({ ...addExercise2Info, time: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input,]}
                                mode='outlined'
                                placeholder="Time..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />
                            <TextInput
                                label={
                                    <Text>
                                        Remark
                                    </Text>
                                }
                                value={addExercise2Info.remark}
                                onChangeText={text =>
                                    setAddExercise2Info({ ...addExercise2Info, remark: text })}
                                outlineColor='#ECAC4A'
                                autoCapitalize="none"       // Prevent auto-capitalization
                                //activeOutlineColor='#D1D1D1'
                                theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                                //style={styles.input}
                                // style={{ width: '90%', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                                style={[styles.input,]}
                                mode='outlined'
                                placeholder="Remark..."
                            // right={<TextInput.Icon name="crosshairs-gps" onPress={() => setShowMap(true)} color={'#2F8C88'} />}
                            />
                        </View>
                        <View style={[styles.buttonContainer, { marginTop: 0 }]}>
                            <TouchableOpacity style={{ backgroundColor: '#ECAC4A', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}>
                                <Text style={{ marginHorizontal: 5, color: 'white', fontSize: 18, fontFamily: 'Montserrat-Medium' }} onPress={() => {
                                    // toggleModal(valueI);
                                    // setValueI(null)
                                    //cancelModal
                                    toggleModal(addExercise2Info)
                                }
                                } >Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: '#7E93A8', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginHorizontal: 5 }}
                                onPress={cancelModal}>
                                <Text style={{ marginHorizontal: 5, color: 'white', fontSize: 18, fontFamily: 'Montserrat-Medium' }} onPress={cancelModal} >
                                    Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            ) : null}
        </View>
    )
}
const styles = StyleSheet.create({
    errorBox: {
        flex: 1,
    },
    loadercontainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", // Optional: Set background color
    },
    loadertext: {
        marginTop: 10,
        fontSize: 16,
        color: "#333",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: 350,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        width: 200
    },
    closeButton: {
        fontSize: 30,
        color: "#333",
        marginRight: 10
    },
    dropdown1: {
        height: 50,
        width: 300,
        borderColor: '#ECAC4A',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        justifyContain: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 10
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        height: 200,
    },
    modalContent1: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        height: 300,
    },
    row1: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Adjust spacing between items
    },
    radioGroup1: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 5, // Add spacing between RadioButton and label
    },
    dropdown: {
        width: 250,
        marginBottom: 20,
        borderColor: '#ccc',
        marginTop: 10
    },
    dropdownContainer: {
        width: 250,
        borderColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
    },
    asterisk: {
        color: 'red', // Highlight the asterisk in red
    },
    input: {
        marginBottom: 15,
        height: 50,
        width: 300,
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: 'Montserrat-Bold',
        backgroundColor: '#FFFFFF'
    },
});
export default PopupModal;