import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, ImageBackground } from 'react-native';
import axios from 'axios'; // Asegúrate de importar Axios

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState(''); // Cambiar a solo nombre
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefono, setTelefono] = useState(''); // Estado para el teléfono
  const [rol, setRol] = useState('usuario'); // Puedes establecer un rol por defecto o permitir al usuario elegir

  const handleRegister = async () => {
    if (nombre && email && password && confirmPassword && telefono) {
      if (password === confirmPassword) {
        // Crear objeto de usuario según la estructura requerida por la API
        const usuario = {
          nombre: nombre,
          correo: email,
          password: password,
          telefono: telefono,
          rol: rol,
        };

        try {
          // Enviar solicitud a la API para registrar al usuario
          const response = await axios.post('https://flaskrosetalummitechapi.vercel.app/api/usuarios/registrar', usuario);
          alert('Usuario registrado con éxito!');
          navigation.navigate('Login'); // Navegar de vuelta a la pantalla de inicio de sesión
        } catch (error) {
          alert('Error al registrar el usuario: ' + error.message); // Muestra error si falla
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
      source={require('../assets/sala-1.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.registerBox}>
          <Text style={styles.title}>Registrarse</Text>
          
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Nombre Completo"
              value={nombre}
              onChangeText={setNombre}
              autoCapitalize="words"
              placeholderTextColor="#aaa"
            />
          </View>

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
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
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

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={telefono}
              onChangeText={setTelefono} // Nuevo campo para teléfono
              keyboardType="phone-pad" // Teclado numérico para teléfono
              placeholderTextColor="#aaa"
            />
          </View>

          {/* Opcional: campo para seleccionar rol */}
          {/* Puedes agregar un selector o dejarlo como un campo de texto */}
          
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <View style={styles.login}>
            <Text style={{ color: '#fff' }}>
              ¿Ya tienes una cuenta? 
              <Text 
                style={styles.link} 
                onPress={() => navigation.navigate('Login')}
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
  registerBox: {
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
});

export default RegisterScreen;
