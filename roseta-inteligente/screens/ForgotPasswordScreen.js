// screens/ForgotPasswordScreen.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, ImageBackground } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (email && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        // Aquí puedes agregar la lógica para restablecer la contraseña
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
    <ImageBackground 
      source={require('../assets/sala-1.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.forgotPasswordBox}>
          <Text style={styles.title}>Recuperar Contraseña</Text>
          
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Nueva Contraseña"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
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
            <Text style={{ color: '#fff' }}>
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
  },
  forgotPasswordBox: {
    width: 350,
    padding: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(5,5,5,.7)',
    alignItems:'center'
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
  login: {
    marginTop: 20,
    textAlign:'center'
  },
});

export default ForgotPasswordScreen;
