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

const LogoutConfirmationModal = ({ visible, onCancel, onConfirm }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Logout</Text>
                        <TouchableOpacity onPress={onCancel}>
                            <Icon name="close" size={26} color={colors.themeColor} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.message}>Are you sure you want to logout?</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.logoutButton} onPress={onConfirm}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default LogoutConfirmationModal;

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
        height: '25%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: '#433636',
    },
    message: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: '#000',
        textAlign: 'center',
        marginVertical: 15,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: colors.themeColor,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginHorizontal: 7
    },
    cancelButtonText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
    logoutButton: {
        backgroundColor: '#f44336',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginHorizontal: 7
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
});
