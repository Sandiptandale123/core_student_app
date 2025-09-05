import React, { useState, useEffect } from 'react';
import {
    ScrollView, View, Text, TouchableOpacity,
    FlatList, StyleSheet, Alert, KeyboardAvoidingView
} from 'react-native';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import moment from 'moment';
import api from '../config/config';

const DietSupplementComponent = () => {
    const [dietSupplementList1, setDietSupplementList1] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        dietsupplementApi();
    }, []);

    const dietsupplementApi = async () => {
        try {
            // Fetch diet supplement data
            const response = await axios.get(`${api.apiUrl}/dietsupplement-masters`, {
                headers: { 'Cache-Control': 'no-cache' }
            });

            if (!response.data || !Array.isArray(response.data)) {
                console.error('Invalid response format from API');
                setDietSupplementList1([]);
            } else {
                setDietSupplementList1([]); // Ensure empty state if data is invalid
                return;
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    const SupplementUsageHeader = () => (
        <View style={[styles.header, { flex: 1 }]}>
            <Text style={[styles.headerText, { width: 50, textAlign: 'left', fontSize: 14, }]}>Delete</Text>
            <Text style={[styles.headerText, { width: 200, alignItems: 'center', alignSelf: 'center', textAlign: 'center', fontSize: 14, paddingLeft: 20 }]}>Supplements Type</Text>
            <Text style={[styles.headerText, { width: 200, marginLeft: 20, fontSize: 14 }]}>Dosage</Text>
        </View>
    );
    const SupplementUsageTableRow = ({ item, index }) => {
        return (
            <TouchableOpacity style={[
                styles.row,
                { backgroundColor: index % 2 === 0 ? '#f1f1f1' : '#ffffff', justifyContent: 'center', alignItems: 'center' },
            ]}
                onPress={() => {
                    //console.log("printconsoledata",JSON.stringify(item))
                    //navigation.navigate('CreateTrainer', { trainerData: item })
                }}>
                <TouchableOpacity style={[styles.cell, { width: 50, paddingLeft: 20 }]}
                    onPress={() => {
                        //sendWhatsAppMessage(item.trainerMobile)
                    }}>
                    <AntDesign name="delete" size={20} color="#FF0000" />
                </TouchableOpacity>

                <TextInput
                    value={item.type}
                    //onChangeText={text => setClientInfo({ ...clientInfo, clientAddress: text })}
                    autoCapitalize='none'
                    outlineColor='#ECAC4A'
                    //activeOutlineColor='#D1D1D1'
                    editable={false} // Make it non-editable
                    theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                    //style={styles.input}
                    style={{ width: 200, marginHorizontal: 10, justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                    //style={styles.input}
                    mode='outlined'
                    placeholder=""
                />

                <TextInput
                    value={item.dosage}
                    //onChangeText={text => setClientInfo({ ...clientInfo, clientAddress: text })}
                    autoCapitalize='none'
                    outlineColor='#ECAC4A'
                    //activeOutlineColor='#D1D1D1'
                    editable={false} // Make it non-editable
                    theme={{ colors: { primary: '#ECAC4A', underlineColor: '#ECAC4A' } }}
                    //style={styles.input}
                    style={{ width: 200, marginHorizontal: 10, justifyContent: 'center', alignSelf: 'center', fontFamily: 'Montserrat-Bold', backgroundColor: '#FFFFFF' }}
                    //style={styles.input}
                    mode='outlined'
                    placeholder=""
                />
            </TouchableOpacity>
        );
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.container2}>
                    <SupplementUsageHeader />
                    <FlatList
                        data={dietSupplementList1}
                        renderItem={({ item, index }) => <SupplementUsageTableRow item={item} index={index} />}
                        keyExtractor={(item) => item.dietsupplementId}
                    />
                </View>
            </ScrollView>
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

export default DietSupplementComponent;
