import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const AddDevicesScreen = ({ navigation, route }) => {
  const { id_usuario } = route.params || {};
  const [estado, setEstado] = useState(true);
  const [ubicacion, setUbicacion] = useState('');

  const handleAddDevice = async () => {
    if (ubicacion) {
      const dispositivo = {
        id_dispositivo: 0,
        estado: estado,
        id_usuario: parseInt(id_usuario),
        ubicacion: ubicacion
      };

      try {
        const response = await axios.post('https://flaskrosetalummitechapi.vercel.app/api/rosetas/registrar', dispositivo);
        
        if (response.data.code === 0) {
          Alert.alert('Éxito', 'Dispositivo agregado correctamente!');
          // Pasar el nuevo dispositivo a HomeScreen
          navigation.navigate('Home', { newDeviceName: ubicacion }); // Cambiar 'Home' por el nombre correcto de tu pantalla
        } else {
          Alert.alert('Error', response.data.message);
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Agregar Dispositivo</Text>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Ubicación del Dispositivo"
          value={ubicacion}
          onChangeText={setUbicacion}
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
  backButton: { position: 'absolute', top: 40, left: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputBox: { width: '100%', marginVertical: 15 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10 },
  button: { width: '80%', height: 40, backgroundColor: '#007bff', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});

export default AddDevicesScreen;
