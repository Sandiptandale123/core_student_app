// components/ImagePickerModal.js
import React from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImagePickerModal = ({ showModal, closeModal, onImagePick }) => {
    const openCamera = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.errorCode && response.assets) {
                onImagePick(response.assets[0].uri);
                closeModal();
            }
        });
    };

    const openGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.errorCode && response.assets) {
                onImagePick(response.assets[0].uri);
                closeModal();
            }
        });
    };

    return (
        <Modal
            transparent
            animationType="fade"
            visible={showModal}
            onRequestClose={closeModal}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Choose Option</Text>

                    <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
                        <Text style={styles.optionText}>📷 Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton} onPress={openGallery}>
                        <Text style={styles.optionText}>🖼️ Gallery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.optionButton, { backgroundColor: '#868686' }]}
                        onPress={closeModal}>
                        <Text style={styles.optionText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        width: 300,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#000000',
        fontFamily: 'Montserrat-Bold',
        marginBottom: 20,
    },
    optionButton: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#3DA8EF',
        marginVertical: 5,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        color: 'white'
    },
});
