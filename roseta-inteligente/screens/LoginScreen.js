import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, ImageBackground } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      // Aquí puedes agregar la lógica de autenticación si es necesario
      navigation.navigate('Home'); // Navegar a la pantalla principal
    } else {
      alert('Por favor ingresa tu usuario y contraseña.');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/sala-1.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#aaa"
            />
          </View>
          
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#aaa"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.register}>
            <Text style={{ color: '#fff' }}>
              ¿No tienes una cuenta? 
              <Text 
                style={styles.link} 
                onPress={() => navigation.navigate('Register')} // Navegar a la pantalla de registro
              >
                Regístrate
              </Text>
            </Text>
          </View>

          <View style={styles.forgotPassword}>
            <Text style={{ color: '#fff' }}>
              ¿Olvidaste tu contraseña? 
              <Text 
                style={styles.link} 
                onPress={() => navigation.navigate('ForgotPassword')} // Navegar a la pantalla de recuperación de contraseña
              >
                Recuperar
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    width: 350,
    padding: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(5, 5, 5, .7)',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputBox: {
    width: '100%',
    marginVertical: 15,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  register: {
    marginTop: 20,
    textAlign: 'center',
  },
  forgotPassword: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#007bff', // Color del enlace
    textDecorationLine: 'underline', // Subrayar el texto del enlace
  },
});

export default LoginScreen;
