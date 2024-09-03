import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const CodeScreen = ({navigation}: any) => {
  const handleNext = () =>{
    navigation.navigate('ResetPasswordForgotScreen')
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Verify Phone Number</Text>
        <Text style={styles.subHeaderText}>
          We have sent you a 5 digit code. Please enter it here to verify your number.
        </Text>
      </View>
      <View style={styles.emailContainer}>
        <Text style={styles.emailText}>Email.............</Text>
      </View>
      <View style={styles.codeInputContainer}>
        <TextInput style={styles.codeInput} maxLength={1} />
        <TextInput style={styles.codeInput} maxLength={1} />
        <TextInput style={styles.codeInput} maxLength={1} />
        <TextInput style={styles.codeInput} maxLength={1} />
        <TextInput style={styles.codeInput} maxLength={1} />
      </View>
      <TouchableOpacity 
      style={styles.nextButton}
      onPress={handleNext}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginBottom: 10,
  },
  subHeaderText: {
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
  },
  emailContainer: {
    padding: 10,
    backgroundColor: '#EEEEEE',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  emailText: {
    color: 'black',
    fontSize: 18,
  },
  codeInputContainer: {
    marginTop: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeInput: {
    width: '15%',
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  nextButton: {
    marginTop: 30,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#00008B',
    borderColor: '#00008B',
    margin: 20
  },
  nextText: {
    color: 'white',
    fontSize: 21,
    fontWeight: '500',
  },
});

export default CodeScreen;
