import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';

const SuccessModal = ({ showModal, closeModal, message }) => {
    return (
        <Modal
            transparent={true}
            visible={showModal}
            animationType="fade"
            onRequestClose={closeModal}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* Header with Close Button */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Message</Text>
                        <TouchableOpacity onPress={closeModal}>
                            <Icon name="close" size={26} color={colors.themeColor} />
                        </TouchableOpacity>
                    </View>

                    {/* Message with Icon */}
                    <View style={styles.content}>
                        {/* <Icon name="checkmark-circle" size={60} color="green" /> */}
                        <Text style={styles.message}>{message}</Text>
                    </View>

                    {/* OK Button */}
                    <TouchableOpacity style={styles.okButton} onPress={closeModal}>
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default SuccessModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        elevation: 10,
        width: '80%',
        alignItems: 'center'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: colors.black,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    message: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'Montserrat-Bold',
    },
    okButton: {
        marginTop: 25,
        backgroundColor: colors.themeColor,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    okButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
});
