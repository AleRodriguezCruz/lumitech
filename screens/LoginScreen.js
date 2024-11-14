// screens/LoginScreen.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import axios from 'axios'; // Asegúrate de importar Axios

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState(''); // Cambié 'username' a 'correo'
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (correo && password) {
      try {
        // Realizar la solicitud POST a la API con solo los datos necesarios
        const response = await axios.post('https://flaskrosetalummitechapi.vercel.app/api/login', {
          correo: correo,
          password: password,
        }, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        // Manejar la respuesta de la API
        if (response.status === 200) {
          alert('Inicio de sesión exitoso!');
          navigation.navigate('Home'); // Navegar a la pantalla principal
        } else {
          alert('Credenciales incorrectas. Por favor intenta de nuevo.');
        }
      } catch (error) {
        // Manejo del error
        if (error.response) {
          alert('Error al iniciar sesión: ' + error.response.data.message || 'Credenciales incorrectas.');
        } else {
          alert('Error al iniciar sesión: ' + error.message);
        }
      }
    } else {
      alert('Por favor ingresa tu correo y contraseña.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginBox}>
        <Image source={require('../assets/logo3.png')} style={styles.logo} />
        <Text style={styles.title}>Iniciar Sesión</Text>
        
        <View style={styles.inputBox}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={[styles.input, { borderColor: '#90E0EF' }]}
            placeholder="Correo"
            value={correo}
            onChangeText={setCorreo}
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={[styles.input, { borderColor: '#90E0EF' }]}
            placeholder="Contraseña"
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
          <Text style={{ color: '#000', textAlign: 'center' }}>
            ¿No tienes una cuenta? 
            <Text 
              style={styles.link} 
              onPress={() => navigation.navigate('Register')}
            >
              Regístrate
            </Text>
          </Text>
        </View>

        <View style={styles.forgotPassword}>
          <Text style={{ color: '#000', textAlign: 'center' }}>
            ¿Olvidaste tu contraseña? 
            <Text 
              style={styles.link} 
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              Recuperar
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginBox: {
    width: 300,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  inputBox: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor:'#0077B6',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
    backgroundColor: '#90E0EF',
    fontSize: 14,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;
