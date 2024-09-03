import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const LoginScreen = ({navigation}: any) => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const loginUser = () => {
    navigation.navigate('AppNavigator')
  }
  // Các hàm xử lý sự kiện
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe); 
  };

  const navigateToRegister = () => {
    navigation.navigate('Register'); 
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/Gawean.png')}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Sign in to your account</Text>
        <View style={styles.email}>
          <Text style={styles.emailText}>Email</Text>
          <TextInput style={styles.input} placeholder="Email" />
        </View>
        <View style={styles.password}>
          <Text style={styles.passwordText}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={styles.checkbox} onPress={toggleRememberMe}>
            {rememberMe && <View style={styles.checkboxInner} />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={loginUser}>
          <Text style={styles.loginButtonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={navigateToForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot the password ?</Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', color: 'black', fontSize: 15}}>
          or continue with
        </Text>
        <View style={styles.AuthGr}>
          <TouchableOpacity
            style={[styles.facebookButton, {marginRight: 10}]}
            onPress={() => console.log('Facebook button clicked')}>
            <Icon name="facebook" size={20} color="white" />
            <Text style={styles.facebookButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.facebookButton, {backgroundColor: '#DB4437'}]}
            onPress={() => console.log('Facebook button clicked')}>
            <Icon name="google" size={20} color="white" />
            <Text style={styles.facebookButtonText}>Google</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={[styles.registerText, {color: 'black'}]}>
              Do not have an account?
            </Text>
            <TouchableOpacity onPress={navigateToRegister}>
              <Text style={styles.registerText}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '25%',
  },
  content: {
    width: '100%',
    height: '75%',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  email: {
    width: '100%',
    alignItems: 'center',
  },
  emailText: {
    width: '100%',
    alignItems: 'flex-start',
  },
  password: {
    width: '100%',
    alignItems: 'center',
  },
  passwordText: {
    width: '100%',
    alignItems: 'flex-start',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#007bff',
    borderRadius: 3,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#007bff',
    fontSize: 16,
    marginBottom: 20,
  },
  forgotPasswordButton: {
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 16,
  },
  AuthGr: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    height: 50,
    backgroundColor: '#3b5998',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  facebookButtonText: {
    color: 'white',
    marginLeft: 10,
  },
});

export default LoginScreen;
