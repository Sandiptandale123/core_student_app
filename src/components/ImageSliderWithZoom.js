import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageViewing from 'react-native-image-viewing';

const { width } = Dimensions.get('window');

const ImageSliderWithZoom = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const flatListRef = useRef(null);

  const goNext = () => {
    if (currentIndex < images.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex });
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current.scrollToIndex({ index: prevIndex });
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        setCurrentIndex(index);
        setIsZoomVisible(true);
      }}>
      <Image source={item} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    <View style={{ alignItems: 'center' }}>
      <FlatList
        ref={flatListRef}
        horizontal
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(index);
        }}
      />

      {/* Left icon */}
      {currentIndex > 0 && (
        <TouchableOpacity style={styles.leftIcon} onPress={goPrev}>
          <Icon name="chevron-left" size={32} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Right icon */}
      {currentIndex < images.length - 1 && (
        <TouchableOpacity style={styles.rightIcon} onPress={goNext}>
          <Icon name="chevron-right" size={32} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Fullscreen Zoom View */}
      <ImageViewing
        images={images.map(image => ({ uri: Image.resolveAssetSource(image).uri }))}
        imageIndex={currentIndex}
        visible={isZoomVisible}
        onRequestClose={() => setIsZoomVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 280,
    resizeMode: 'cover',
  },
  leftIcon: {
    position: 'absolute',
    top: '45%',
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 6,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    top: '45%',
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 6,
    zIndex: 1,
  },
});

export default ImageSliderWithZoom;
