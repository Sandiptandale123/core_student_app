import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Appbar, Provider as PaperProvider } from 'react-native-paper';

const TermsAndConditions = ({ navigation }) => {
  const handleAccept = () => {
    // Navigate or mark as accepted
    navigation.goBack(); // or navigate('NextScreen')
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.heading}>Terms and Conditions</Text>

          <Text style={styles.paragraph}>
            1. By using this app, you agree to comply with and be bound by these terms...
          </Text>
          <Text style={styles.paragraph}>
            2. You must not misuse the services or access them in any illegal manner...
          </Text>
          <Text style={styles.paragraph}>
            3. All data collected will be handled securely and will not be shared...
          </Text>
          {/* Add more sections as needed */}
        </ScrollView>

        {/* <Button
          mode="contained"
          onPress={handleAccept}
          style={styles.button}
        >
          Accept & Continue
        </Button> */}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
    color: '#333',
  },
  button: {
    margin: 16,
    borderRadius: 8,
  },
});

export default TermsAndConditions;
