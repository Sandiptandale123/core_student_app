import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('facultyInfo');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    //console.log("printstoredUser", JSON.stringify(parsedUser))
                    // You can also dispatch again if you want:
                    // dispatch({ type: SET_USER, payload: parsedUser });
                    navigation.replace('Home');
                } else {
                    navigation.replace('Login');
                }
            } catch (err) {
                console.log('AsyncStorage error:', err);
                navigation.replace('Login');
            }
        };

        setTimeout(() => {
            checkLogin();
        }, 2000);
    }, []);
    return (
        <SafeAreaView style={styles.safearea}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.container}>
                <Image
                    resizeMode="contain"
                    style={styles.logo}
                    source={require('../../assets/core_logo.jpeg')}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: '40%',
    },
});

export default SplashScreen;
