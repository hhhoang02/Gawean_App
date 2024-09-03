import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const ForgotPasswordScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');

  const handleNext = () => {
    navigation.navigate('CodeScreen')
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.forgotText}>Forgot Password</Text>
        <Text style={styles.selectText}>
          Select which contact details should we use to reset your password
        </Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@yourdomain.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    width: '90%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  selectText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
  },
  inputGroup: {
    width: '90%',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: 'black',
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
    marginTop: 10,
  },
  nextButton: {
    width: '90%',
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {

    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
