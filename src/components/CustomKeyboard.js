import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const keys = [
  '1','2','3',
  '4','5','6',
  '7','8','9',
  '0','A','B','C'
];

const CustomKeyboard = ({ onKeyPress, onDelete }) => {
  return (
    <View style={styles.container}>
      {keys.map((key) => (
        <TouchableOpacity
          key={key}
          style={styles.key}
          onPress={() => onKeyPress(key)}
        >
          <Text style={styles.keyText}>{key}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={[styles.key, styles.delete]} onPress={onDelete}>
        <Text style={styles.keyText}>⌫</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  key: {
    width: '22%',
    margin: '1%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  keyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  delete: {
    backgroundColor: '#ffcccc',
  },
});

export default CustomKeyboard;
