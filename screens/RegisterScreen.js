// screens/RegisterScreen.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import axios from 'axios'; // Asegúrate de importar Axios

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('usuario');

  const handleRegister = async () => {
    if (nombre && email && password && confirmPassword && telefono) {
      if (password === confirmPassword) {
        const usuario = {
          nombre: nombre,
          correo: email,
          password: password,
          telefono: telefono,
          rol: rol,
        };

        try {
          const response = await axios.post('https://flaskrosetalummitechapi.vercel.app/api/usuarios/registrar', usuario);
          alert('Usuario registrado con éxito!');
          navigation.navigate('Login');
        } catch (error) {
          alert('Error al registrar el usuario: ' + error.message);
        }
      } else {
        alert('Las contraseñas no coinciden.');
      }
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.registerBox}>
        {/* Agregar el logo aquí */}
        <Image source={require('../assets/logo3.png')} style={styles.logo} />

        <Text style={styles.title}>Regístrate</Text>

        {/* Campo Nombre */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Nombre Completo</Text>
          <TextInput
            style={[styles.input, { borderColor: '#90E0EF' }]} // Cambia el color del borde aquí
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="words"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Campo Email */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, { borderColor: '#90E0EF' }]} // Cambia el color del borde aquí
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Campo Contraseña */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={[styles.input, { borderColor: '#90E0EF' }]} // Cambia el color del borde aquí
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Campo Confirmar Contraseña */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Confirmar Contraseña</Text>
          <TextInput
            style={[styles.input, { borderColor: '#90E0EF' }]} // Cambia el color del borde aquí
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Campo Teléfono */}
        <View style={styles.inputBox}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={[styles.input, { borderColor: '#90E0EF' }]} // Cambia el color del borde aquí
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
            placeholderTextColor="#aaa"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Regístrate</Text>
        </TouchableOpacity>

        <View style={styles.login}>
          <Text style={{ color: '#03045E' }}>
            ¿Ya tienes una cuenta? 
            <Text 
              style={[styles.link, styles.linkLarge]} // Aplicar estilos para aumentar el tamaño
              onPress={() => navigation.navigate('Login')}
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
  registerBox: {
    width: 350,
    padding: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 100, // Ajusta el tamaño del logo según sea necesario
    height: 100,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Color negro para las etiquetas
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor:'#90E0EF', 
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000', // Color del texto
    backgroundColor: '#90E0EF', // Fondo del input (ajustado a un color claro)
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#0077B6',
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
    color: '#007bff', // Resaltar el enlace de "Iniciar Sesión"
    fontWeight: 'bold',
  },
  linkLarge: {
    fontSize: 18, // Aumentar el tamaño de fuente del enlace
  },
});

export default RegisterScreen;
