// screens/ForgotPasswordScreen.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, Image } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (email && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        alert('Contraseña restablecida con éxito.');
        navigation.navigate('Login'); // Navegar de vuelta a la pantalla de inicio de sesión
      } else {
        alert('Las contraseñas no coinciden.');
      }
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.forgotPasswordBox}>
        <Image 
          source={require('../assets/logo3.png')} // Ruta a tu logo
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Recuperar Contraseña</Text>
        
        <View style={styles.inputBox}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Nueva Contraseña</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Confirmar Contraseña</Text>
          <TextInput
            style={styles.input}
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
          <Text style={{ color: '#000' }}>
            ¿Ya tienes tu contraseña? 
            <Text 
              style={styles.link} 
              onPress={() => navigation.navigate('Login')} // Navegar a la pantalla de inicio de sesión
            >
              {' '}Inicia Sesión
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
    backgroundColor: '#fff', // Fondo blanco
  },
  forgotPasswordBox: {
    width: 350,
    padding: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems:'center'
  },
  logo: {
    width: '100%', // Ajusta el ancho según sea necesario
    height: 100, // Ajusta la altura según sea necesario
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  inputBox: {
    width: '100%',
    marginVertical: 15,
  },
  label: {
    color: '#000', // Etiquetas en color negro
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#90E0EF',
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
  login: {
    marginTop: 20,
    textAlign:'center'
  },
  link: {
    fontSize :18,
    width: '40',
    height: 40,
    color: '#007bff', // Color del enlace
    textDecorationLine: 'underline', // Subrayar el texto del enlace
  },
});

export default ForgotPasswordScreen;
