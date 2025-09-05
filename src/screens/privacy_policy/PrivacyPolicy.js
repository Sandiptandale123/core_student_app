import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Appbar, Provider as PaperProvider } from 'react-native-paper';

const PrivacyPolicy = ({ navigation }) => {
  const handleAccept = () => {
    navigation.goBack(); // or navigate to next screen if needed
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.heading}>Privacy Policy</Text>

          <Text style={styles.paragraph}>
            1. We respect your privacy and are committed to protecting your personal data.
          </Text>
          <Text style={styles.paragraph}>
            2. Information we collect includes name, phone number, and usage data to improve our service.
          </Text>
          <Text style={styles.paragraph}>
            3. Your data will never be sold or shared without your consent.
          </Text>
          <Text style={styles.paragraph}>
            4. We use secure storage and transmission methods to protect your data.
          </Text>
          <Text style={styles.paragraph}>
            5. You have the right to access, modify, or delete your information at any time.
          </Text>
          {/* Add more sections if needed */}
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

export default PrivacyPolicy;
