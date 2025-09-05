import React, { useState, useEffect, useRef } from 'react';
import {
    ScrollView, View, Text, TouchableOpacity,
    FlatList, StyleSheet, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard
} from 'react-native';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import moment from 'moment';
import api from '../config/config';

const DietHistoryComponent = () => {
    const [dietHistoryList, setDietHistoryList] = useState([{
        diethistoryId: 1,
        time: "Early Morning",
        eat: "fgf",
        quantity: 0,
        mealTime: "21:23:00"
    },
    {
        diethistoryId: 2,
        time: "Breakfast",
        eat: "fgfg",
        quantity: 0,
        mealTime: "21:24:00"
    },
    {
        diethistoryId: 3,
        time: "In Between",
        eat: "fgf",
        quantity: 0,
        mealTime: "00:00:00"
    },
    {
        diethistoryId: 4,
        time: "Lunch",
        eat: "",
        quantity: 0,
        mealTime: "00:00:00"
    },
    {
        diethistoryId: 5,
        time: "Snacks",
        eat: "",
        quantity: 0,
        mealTime: "00:00:00"
    },
    {
        diethistoryId: 6,
        time: "Dinner",
        eat: "",
        quantity: 0,
        mealTime: "00:00:00"
    }]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [showPicker, setShowPicker] = useState(false);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);

    const updateMealTime = (index, newTime) => {
        setDietHistoryList((prevList) =>
            prevList.map((item, i) =>
                i === index ? { ...item, mealTime: newTime } : item
            )
        );
    };


    // ✅ Table Header
    const TableHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>Timing</Text>
            <Text style={styles.headerText}>What You Eat</Text>
            <Text style={styles.headerText}>Meal Time</Text>
            <Text style={styles.headerText}>Quantity</Text>
        </View>
    );

    const TableRow = ({
        item,
        index,
        showPicker,
        setShowPicker,
        selectedTimeIndex,
        setSelectedTimeIndex,
    }) => {
        const eatRef = useRef(null); // Separate ref for 'What You Eat'
        const quantityRef = useRef(null); // Separate ref for 'Quantity'
        const timeRef = useRef(null);
        return (
            <View style={[
                styles.row,
                { backgroundColor: index % 2 === 0 ? "#f1f1f1" : "#ffffff", alignItems: "center" },
            ]}>
                <Text numberOfLines={1} style={styles.cell}>{item.time}</Text>

                {/* What You Eat */}
                <TextInput
                    ref={eatRef}
                    value={item.eat}
                    multiline={true}
                    onChangeText={(text) => {
                        if (eatRef.current) {
                            eatRef.current.setNativeProps({ text: text })
                        }
                    }}
                    textAlignVertical="top"
                    autoCapitalize="none"
                    outlineColor="#ECAC4A"
                    theme={{ colors: { primary: "#ECAC4A", underlineColor: "#ECAC4A" } }}
                    style={styles.input}
                    mode="outlined"
                />

                {/* Meal Time Picker */}
                <View style={styles.timePickerContainer}>
                    <TouchableOpacity
                        style={styles.timeButton}
                        onPress={() => {
                            setSelectedTimeIndex(index);
                            setShowPicker(true);
                        }}
                    >
                        <TextInput
                            ref={timeRef}
                            value={moment(dietHistoryList[index].mealTime, "HH:mm:ss").format("hh:mm A")} // ✅ Meal time directly from state
                            editable={false} // Make it non-editable
                            autoCapitalize="none"
                            outlineColor="#ECAC4A"
                            theme={{ colors: { primary: "#ECAC4A", underlineColor: "#ECAC4A" } }}
                            style={[styles.input, { width: 150, height: 50, backgroundColor: "transparent" }]}
                            mode="outlined"
                            right={
                                <TextInput.Icon
                                    icon="clock"
                                    onPress={() => {
                                        setSelectedTimeIndex(index);
                                        setShowPicker(true);
                                    }}
                                    color={"black"}
                                />
                            }
                        />
                    </TouchableOpacity>
                </View>

                {/* Show DateTimePicker for Selected Row Only */}
                {showPicker && selectedTimeIndex === index && (
                    <DateTimePicker
                    value={moment(item.mealTime, "HH:mm:ss").toDate()}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={(event, selectedDate) => {
                            if (selectedDate) {
                                const formattedTime = moment(selectedDate).format("HH:mm:ss");
                                updateMealTime(index, formattedTime); // ✅ Correct method
                            }
                            setShowPicker(false);
                        }}
                    />

                )}


                {/* Quantity Input */}
                <TextInput
                    ref={quantityRef}
                    value={item.quantity.toString()}
                    onChangeText={(text) => {
                        if (quantityRef.current) {
                            quantityRef.current.setNativeProps({ text: text })
                        }
                    }}
                    autoCapitalize="none"
                    outlineColor="#ECAC4A"
                    theme={{ colors: { primary: "#ECAC4A", underlineColor: "#ECAC4A" } }}
                    style={styles.quantityInput}
                    mode="outlined"
                    keyboardType="numeric"
                />
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            {/* ✅ Tap anywhere to dismiss keyboard */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    horizontal={true}
                >
                    <View style={styles.container2}>
                        <TableHeader />
                        <FlatList
                            data={dietHistoryList}
                            renderItem={({ item, index }) =>
                                <TableRow
                                    item={item}
                                    index={index}
                                    showPicker={showPicker}
                                    setShowPicker={setShowPicker}
                                    selectedTimeIndex={selectedTimeIndex}
                                    setSelectedTimeIndex={setSelectedTimeIndex}
                                    updateMealTime={updateMealTime}
                                />
                            }
                            keyExtractor={(item) => item.diethistoryId.toString()}
                            keyboardShouldPersistTaps="handled" // ✅ Allow TextInput to stay focused
                            contentContainerStyle={{ flexGrow: 1 }}
                            nestedScrollEnabled={true}
                            initialNumToRender={10}
                            removeClippedSubviews={false}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        backgroundColor: '#F3F3FA',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#d3d3d3',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center'
    },
    headerText: {
        width: 150,
        textAlign: 'left',
        paddingLeft: 5,
        fontSize: 18,
        fontWeight: '600'
    },
    cell: {
        width: 150,
        textAlign: 'left',
        paddingLeft: 5,
        fontSize: 16
    },
    input: {
        width: 200,
        height: 100,
        backgroundColor: 'white',
    },
    timePickerContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150
    },
    timeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7E9',
        padding: 5,
        backgroundColor: '#FFFFFF'
    },
    timeText: {
        width: 50,
        textAlign: 'center',
        fontSize: 16,
    },
    quantityInput: {
        width: 150,
        backgroundColor: "#FFFFFF",
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: "green",
        padding: 10,
        alignItems: "center"
    }
});

export default DietHistoryComponent;
