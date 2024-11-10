// screens/AddDevicesScreen.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios';

const AddDevicesScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState(''); // Estado para el nombre del dispositivo
  const [estado, setEstado] = useState(true); // Estado para el estado del dispositivo
  const [id_usuario, setIdUsuario] = useState(''); // Estado para el ID del usuario

  // Función para agregar un dispositivo
  const handleAddDevice = async () => {
    if (nombre && id_usuario) {
      const dispositivo = {
        id_dispositivo: 0, // Esto puede ser manejado por la API
        nombre: nombre,
        estado: estado,
        id_usuario: parseInt(id_usuario), // Asegúrate de usar un ID válido
      };

      try {
        const response = await axios.post('https://flaskrosetalummitechapi.vercel.app/api/dispositivos', dispositivo);
        
        // Manejar la respuesta de la API
        if (response.data.code === 0) {
          Alert.alert('Éxito', 'Dispositivo agregado correctamente!');
          navigation.navigate('Devices'); // Navegar a la pantalla de dispositivos después de agregar
        } else {
          Alert.alert('Error', response.data.message); // Mostrar mensaje de error
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo agregar el dispositivo: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Agregar Dispositivo</Text>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Dispositivo"
          value={nombre}
          onChangeText={setNombre}
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="ID del Usuario"
          value={id_usuario}
          onChangeText={setIdUsuario}
          keyboardType="numeric" // Teclado numérico para ID
          placeholderTextColor="#aaa"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddDevice}>
        <Text style={styles.buttonText}>Agregar Dispositivo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputBox: { width: '100%', marginVertical: 15 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10 },
  button: { width: '80%', height: 40, backgroundColor: '#007bff', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});

export default AddDevicesScreen;
