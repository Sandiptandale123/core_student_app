import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';

const ForgotPasswordModal = (props) => {
    const {
        showModal,
        closeModal,
        content = 'Success',
        title = 'Success',
        iconColor = 'green',
    } = props;

    return (
        <Modal isVisible={showModal} transparent={true}>
            <View style={styles.modalContainer}>
                {/* Close Icon Top-Right */}
                <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
                    <Icon name="close" size={35} color={iconColor} />
                </TouchableOpacity>

                <View style={styles.innerContainer}>
                    {/* <Icon name="checkmark-circle" size={50} color={iconColor} /> */}
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{content}</Text>

                    <TouchableOpacity style={styles.okButton} onPress={closeModal}>
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ForgotPasswordModal;

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        alignSelf:'center',
        position: 'relative',
        width:'90%',
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        zIndex: 1,
    },
    innerContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    title: {
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 15,
        color: '#333',
    },
    message: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 15,
        fontFamily: 'Montserrat-SemiBold',
        color: '#555',
    },
    okButton: {
        backgroundColor: colors.primary || '#336699',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        width: 150,
        height: 40,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    okButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
});
