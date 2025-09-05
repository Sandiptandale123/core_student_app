import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import colors from '../../utils/colors';


const { width, height } = Dimensions.get('window')


const CarouselItem = ({ item }) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={item.url} />
            <View style={styles.textView}>
                <Text style={styles.itemTitle}> {item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: 365,
        height: 160,
        borderRadius: 14,
    },

    textView: {
        position: 'absolute',
        top: height / 2,
        margin: 10,
        left: 5,
        alignItems: "center"
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 14,

    },
    itemTitle: {
        color: colors.mainColor,
        fontSize: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
        fontFamily: 'Montserrat-Bold',
        elevation: 5
    },
    itemDescription: {
        color: '#101010',
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})

export default CarouselItem