import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddDeviceScreen = ({ navigation }) => {
  const [deviceName, setDeviceName] = useState('');

  const handleAddDevice = () => {
    if (deviceName.trim()) {
      // Navegar de vuelta a Home y pasar el nombre del dispositivo
      navigation.navigate('Home', { newDeviceName: deviceName });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabecera con botón de cancelar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.cancelButton}>
          <Ionicons name="close-circle" size={30} color="#ff4d4d" />
        </TouchableOpacity>
        <Text style={styles.title}>Agregar Dispositivo</Text>
        {/* Espacio reservado para mantener la alineación */}
        <View style={styles.saveButton} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nombre del dispositivo"
        value={deviceName}
        onChangeText={setDeviceName}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddDevice}>
        <Ionicons name="checkmark-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}> Agregar Dispositivo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    paddingHorizontal: 10,
  },
  saveButton: {
    paddingHorizontal: 10,
    width: 30, // Espacio reservado para mantener la alineación
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom:20
},
addButton:{
backgroundColor:'#007bff',
paddingVertical :15 ,
borderRadius :5 ,
alignItems :'center' ,
flexDirection: 'row', // Alinea el ícono y el texto en fila
justifyContent: 'center', // Centra el contenido
},
addButtonText:{
color:'#fff' ,
fontSize :18 ,
fontWeight :'bold' ,
marginLeft: 10, // Espacio entre el ícono y el texto
},
});

export default AddDeviceScreen;
