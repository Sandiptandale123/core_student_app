import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#336699" />
      <Text style={styles.loaderText}>Loading...</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject, // 👈 overlays entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)', // semi-transparent background
    zIndex: 999,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});
