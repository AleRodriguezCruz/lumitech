import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const AddDevicesScreen = ({ navigation }) => {
  const [estado, setEstado] = useState(true); // Estado del dispositivo (true/false)
  const [ubicacion, setUbicacion] = useState(''); // Ubicación del dispositivo
  const [id_usuario, setIdUsuario] = useState(null); // Estado para almacenar el ID del usuario

  // Efecto para obtener el ID del usuario autenticado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Aquí debes incluir tu token de autenticación si es necesario
        const token = "tu_token_de_autenticacion"; // Reemplaza esto con tu lógica para obtener el token
        const response = await axios.get('https://flaskrosetalummitechapi.vercel.app/api/usuarios/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Agrega el token si es necesario
          },
        });
        
        // Asumimos que la respuesta contiene el ID del usuario
        setIdUsuario(response.data.id_usuario); // Cambia esto según la estructura de tu respuesta
      } catch (error) {
        console.error("Error al obtener el usuario:", error.response ? error.response.data : error.message);
        Alert.alert('Error', 'No se pudo obtener la información del usuario.');
      }
    };

    fetchUser();
  }, []); // Solo se ejecuta una vez al montar el componente

  // Función para agregar una roseta
  const handleAddDevice = async () => {
    if (!ubicacion.trim() || !id_usuario) {
      Alert.alert('Error', 'Por favor completa todos los campos.'); // Mensaje si falta información
      return; // Salir de la función si hay campos vacíos
    }

    const roseta = {
      estado: estado,
      ubicacion: ubicacion,
      id_usuario: id_usuario // Usar el ID obtenido de la API
    };

    console.log("Datos a enviar:", roseta); // Imprimir datos para depuración

    try {
      const response = await axios.post('https://flaskrosetalummitechapi.vercel.app/api/rosetas/registrar', roseta, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      // Manejar la respuesta de la API
      if (response.data.code === 0) {
        Alert.alert('Éxito', 'Roseta agregada correctamente!');
        navigation.navigate('Home', { newDeviceName: ubicacion }); // Navegar a la pantalla principal y pasar el nuevo nombre de la roseta
      } else {
        Alert.alert('Error', response.data.message); // Mostrar mensaje de error
      }
    } catch (error) {
      console.error("Error al agregar roseta:", error.response ? error.response.data : error.message);
      Alert.alert('Error', 'No se pudo agregar la roseta: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botón de regreso */}
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
  backButton: { position: 'absolute', top: 40, left: 20 }, // Posición del botón de regreso
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputBox: { width: '100%', marginVertical: 15 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10 },
  button: { width: '80%', height: 40, backgroundColor: '#007bff', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});

export default AddDevicesScreen;
