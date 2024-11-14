// screens/AddDevicesScreen.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const AddDevicesScreen = ({ navigation }) => {
  const [estado, setEstado] = useState(true); // Estado del dispositivo (true/false)
  const [ubicacion, setUbicacion] = useState(''); // Ubicación del dispositivo

  const id_usuario = 5; // ID del usuario fijo

  const handleAddDevice = async () => {
    if (!ubicacion.trim()) {
      Alert.alert('Error', 'Por favor completa el campo de ubicación.');
      return;
    }

    const roseta = {
      estado: estado,
      ubicacion: ubicacion,
      id_usuario: id_usuario
    };

    try {
      const response = await axios.post('https://flaskrosetalummitechapi.vercel.app/api/rosetas/registrar', roseta, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.data.code === 0) {
        Alert.alert('Éxito', 'Roseta agregada correctamente!');
        navigation.navigate('Home', { refresh: true }); // Pasar un parámetro para indicar que se debe refrescar
      } else {
        Alert.alert('Error', response.data.message || 'Error desconocido');
      }
    } catch (error) {
      Alert.alert('Error', `No se pudo agregar la roseta: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Agregar Roseta</Text>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Ubicación de la Roseta"
          value={ubicacion}
          onChangeText={setUbicacion}
          placeholderTextColor="#aaa"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddDevice}>
        <Text style={styles.buttonText}>Agregar Roseta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  backButton: { position: 'absolute', top: 40, left: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputBox: { width: '100%', marginVertical: 15 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10 },
  button: { width: '80%', height: 40, backgroundColor: '#007bff', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});

export default AddDevicesScreen;
