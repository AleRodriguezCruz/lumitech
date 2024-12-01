// screens/ForgotPasswordScreen.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, ImageBackground, Image } from 'react-native';
import axios from 'axios'; // Asegúrate de importar Axios

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (email && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        try {
          // Realizar la solicitud POST a la API para restablecer la contraseña
          const response = await axios.post('https://flaskrosetalummitechapi.vercel.app/api/reset-password', {
            email: email,
            new_password: newPassword,
          }, {
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });

          // Manejar la respuesta de la API
          if (response.status === 200) {
            alert('Contraseña restablecida con éxito.');
            navigation.navigate('Login'); // Navegar de vuelta a la pantalla de inicio de sesión
          } else {
            alert('Error al restablecer la contraseña. Por favor intenta de nuevo.');
          }
        } catch (error) {
          // Manejo del error
          if (error.response) {
            alert('Error: ' + error.response.data.message || 'Ocurrió un error al restablecer la contraseña.');
          } else {
            alert('Error: ' + error.message);
          }
        }
      } else {
        alert('Las contraseñas no coinciden.');
      }
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  return (
    <ImageBackground 
      
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.forgotPasswordBox}>
          <Image source={require('../assets/logo3.png')} style={styles.logo} />
          <Text style={styles.title}>Recuperar Contraseña</Text>
          
          <View style={styles.inputBox}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={[styles.input, { borderColor: '#90E0EF' }]}
              placeholder="Correo"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Nueva Contraseña</Text>
            <TextInput
              style={[styles.input, { borderColor: '#90E0EF' }]}
              placeholder="Nueva Contraseña"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Confirmar Contraseña</Text>
            <TextInput
              style={[styles.input, { borderColor: '#90E0EF' }]}
              placeholder="Confirmar Contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#aaa"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Restablecer Contraseña</Text>
          </TouchableOpacity>

          <View style={styles.login}>
            <Text style={{ color: '#000', textAlign: 'center' }}>
              ¿Ya tienes tu contraseña? 
              <Text 
                style={styles.link} 
                onPress={() => navigation.navigate('Login')} // Navegar a la pantalla de inicio de sesión
              >
                Inicia Sesión
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
    backgroundColor: '#fff',
  },
  forgotPasswordBox: {
    width: 400,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems:'center',
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

export default ForgotPasswordScreen;
