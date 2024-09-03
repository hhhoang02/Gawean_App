import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen, ForgotPasswordScreen, ResetPasswordForgotScreen,CodeScreen} from '../components/AuthComponent';
import AppNavigator from './AppNavigator';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="CodeScreen" component={CodeScreen} />
      <AuthStack.Screen name="ResetPasswordForgotScreen" component={ResetPasswordForgotScreen} />
      <AuthStack.Screen name="AppNavigator" component={AppNavigator} />
    </AuthStack.Navigator>
  );
};
export default AuthNavigator;

