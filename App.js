import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; 
import LoginScreen from './screens/LoginScreen'; 
import DevicesScreen from './screens/DevicesScreen'; 
import WelcomeScreen from './screens/WelcomeScreen'; 
import AddDeviceScreen from './screens/AddDeviceScreen'; 
import ControlDeviceScreen from './screens/ControlDeviceScreen'; 
import RegisterScreen from './screens/RegisterScreen'; 
import NotificationsScreen from './screens/NotificationsScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { ImageProvider } from './screens/ImageContext';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <ImageProvider>
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
    </ImageProvider>
  );
};


export default AppNavigator;
