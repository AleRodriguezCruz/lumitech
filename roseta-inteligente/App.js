import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Verifica la ruta
import LoginScreen from './screens/LoginScreen'; // Verifica la ruta
import DevicesScreen from './screens/DevicesScreen'; // Verifica la ruta
import WelcomeScreen from './screens/WelcomeScreen'; // Verifica la ruta
import AddDeviceScreen from './screens/AddDeviceScreen'; // Verifica la ruta
import ControlDeviceScreen from './screens/ControlDeviceScreen'; // Verifica la ruta
import RegisterScreen from './screens/RegisterScreen'; // Asegúrate de tener esta pantalla creada
import NotificationsScreen from './screens/NotificationsScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Devices" component={DevicesScreen} />
        <Stack.Screen name="Add Device" component={AddDeviceScreen} />
        <Stack.Screen name="Control Device" component={ControlDeviceScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
