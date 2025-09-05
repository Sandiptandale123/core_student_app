import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Pressable
} from 'react-native';
import Loader from '../../components/Loader';
import colors from '../../utils/colors';
const WelcomeScreen = ({ navigation }) => {
    const [showLoader, setShowLoader] = useState(false);
    const timeout = () => {
        setTimeout(() => {
            setShowLoader(false);
            navigation.navigate('Login');
        }, 2000);
    };
    return (
        <>
            {
                showLoader && <Loader loading={showLoader} />
            }
            <SafeAreaView style={styles.container}>

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/core_logo.jpeg')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Illustration Section */}
                <View style={styles.illustrationContainer}>
                    <Image
                        source={require('../../assets/core_app_interrr.png')}
                        style={styles.illustration}
                        resizeMode="cover"
                    />
                </View>

                {/* Bottom Welcome Section */}
                <View style={styles.bottomSection}>
                    <Text style={styles.welcomeTitle}>Welcome!</Text>
                    <Text style={styles.subtitle}>Welcome to the Core</Text>

                    <Pressable
                        style={({ pressed }) => [
                            styles.loginButton,
                            pressed && { opacity: 0.6 }
                        ]}
                        onPress={() => {
                            setShowLoader(true);
                            timeout();
                        }}
                    >
                        <Text style={styles.loginText}>Login</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 60,
    },
    illustrationContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustration: {
        width: '110%',
        height: '100%',
    },
    bottomSection: {
        flex: 0.4,
        backgroundColor: colors.themeColor,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginTop: 20
    },
    welcomeTitle: {
        fontSize: 36,
        fontFamily: 'Montserrat-SemiBold',
        color: '#FFFFFF',
    },
    subtitle: {
        fontSize: 20,
        fontFamily: 'Montserrat-Regular',
        color: '#FFFFFF',
        marginTop: 5,
    },
    loginButton: {
        backgroundColor: 'white',
        marginTop: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#76B0DC',
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: '#005F9E',
        fontSize: 22,
        fontFamily: 'Montserrat-Medium',
    },
});
