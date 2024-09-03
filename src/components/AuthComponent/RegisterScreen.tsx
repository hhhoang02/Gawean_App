import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import React, {useState} from 'react';

const RegisterScreen = ({navigation}: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };


  const handleSignUp = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    console.log('Signing up...');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/Gawean.png')}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.signUpText}>Sign up to your account.</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={[styles.registerText, {color: 'black'}]}>
            Do you already have an account? 
          </Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.registerText}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 30,
    paddingVertical: 30
  },
  imgContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  title: {
    width: '70%',
    justifyContent: 'center',
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  signUpText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 18,
  },
  content: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  signUpButton: {
    marginTop: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'blue',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#007bff',
    fontSize: 16,
    marginBottom: 20,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
