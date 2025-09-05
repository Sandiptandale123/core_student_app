import React, { useState, useEffect, } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Text, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const EmptyData = (props) => {
    const { navigation, subjectName } = props;
    return (
        <View style={styles.overlayView}>
            <Text>No Data Found...!</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    overlayView: {
        position: 'absolute',
        justifyContent: 'center',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        // opacity: 0.4,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 1,
        zIndex: 1,
        marginTop: 1

    },
    overlayColor: {

    }
});
export default EmptyData;