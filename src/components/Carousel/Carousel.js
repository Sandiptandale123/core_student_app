import React, { useState } from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
//import ReanimatedCarousel from 'react-native-reanimated-carousel';
import colors from '../../utils/colors';

const { width } = Dimensions.get('window');

const Carousel = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <View style={styles.carouselWrapper}>
            {/* <ReanimatedCarousel
                loop
                width={380}
                height={250}
                autoPlay
                data={data}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setActiveIndex(index)}
                renderItem={({ item }) => (
                    <Image resizeMode="cover" source={item.image} style={styles.image} />
                )}
            /> */}
            <View style={styles.dotsContainer}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            { backgroundColor: index === activeIndex ? colors.themeColor : '#FFFFFF' },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    carouselWrapper: {
        width: 380,
        height: 250,
        alignSelf: 'center',
        position: 'relative',
        borderRadius: 25,        // Add this
        overflow: 'hidden',      // Add this to clip child overflow
    },
    image: {
        width: '100%',
        height: '100%',
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
});


export default Carousel;
