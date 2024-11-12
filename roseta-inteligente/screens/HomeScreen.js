import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';

// Imágenes estáticas
const staticImage = require('../assets/product1.jpg');

const HomeScreen = ({ navigation, route }) => {
  const [deviceStates, setDeviceStates] = useState([]);

  useEffect(() => {
    const newDeviceName = route.params?.newDeviceName;
    if (newDeviceName) {
      setDeviceStates(prevDevices => [
        ...prevDevices,
        { id: `${prevDevices.length + 1}`, name: newDeviceName, status: "Conectado", isOn: true }
      ]);
    }
  }, [route.params]);

  const toggleDevice = (id) => {
    setDeviceStates(prevStates =>
      prevStates.map(device =>
        device.id === id ? { ...device, isOn: !device.isOn } : device
      )
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Cerrar sesión",
          onPress: () => {
            navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión
          }
        }
      ]
    );
  };

  const renderDevice = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Control Device', { deviceName: item.name })} style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: '#007bff' }]}>
        <Ionicons name={item.isOn ? "bulb" : "bulb-outline"} size={20} color="#FFD700" />
      </View>
      <Text style={styles.rowLabel}>{item.name}</Text>
      <View style={styles.rowSpacer} />
      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido a tu Roseta Inteligente</Text>
      </View>

      <Image source={staticImage} style={styles.staticImage} />

      <TouchableOpacity onPress={() => navigation.navigate('Add Device')} style={styles.row}>
        <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
        </View>
        <Text style={styles.rowLabel}>Agregar Dispositivo</Text>
        <View style={styles.rowSpacer} />
        <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
      </TouchableOpacity>

      {deviceStates.length > 0 ? (
        <FlatList
          data={deviceStates}
          renderItem={renderDevice}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.deviceList}
        />
      ) : (
        <Text style={{ color: '#000', textAlign: 'center' }}>No hay dispositivos conectados.</Text>
      )}

      {/* Menú en la parte inferior */}
      <View style={styles.menu}>
        {/* Ícono de Inicio */}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="home" size={30} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Ícono de Notificaciones */}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.navigate('Notifications')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="notifications" size={30} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Ícono de Configuración */}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.navigate('Devices')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="settings" size={30} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Ícono de Cerrar Sesión */}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={handleLogout}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="log-out" size={30} color="#ff4d4d" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '7%',
    paddingTop: '7%',
    paddingBottom: 120, // Agregar padding inferior para dar espacio al menú
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#000',
    textAlign: 'center',
  },
  
   /** Botón Agregar Dispositivo */
   row:{
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'flex-start',
     height: 50,
     backgroundColor: '#f2f2f2',
     borderRadius: 8,
     marginBottom: 12,
     paddingHorizontal: 12,
   },
   rowIcon:{
     width: 32,
     height: 32,
     borderRadius: 9999,
     marginRight: 12,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'center',
   },
   rowLabel:{
     fontSize: 17,
     fontWeight:'400',
     color:'#0c0c0c',
   },
   rowSpacer:{
     flexGrow:1,
     flexShrink:1,
     flexBasis:0,
   },

   /** Imagen estática */
   staticImage:{
     width: '100%',
     height: undefined,
     aspectRatio: 16 / 9,
     borderRadius :10,
     marginBottom: '5%',
   },

   /** Lista de dispositivos */
   deviceList:{
     paddingBottom :20,
   },

   /** Menú */
   menu:{
     flexDirection:'row',
     justifyContent:'space-around',
     backgroundColor:'#007bff', // Color de fondo del menú
     paddingVertical:'2%', // Usa un porcentaje para el padding vertical del menú
     position:'absolute', // Fija el menú en la parte inferior
     bottom:0,
     left:0,
     right:0,
   },
   
   menuButton:{
     flexDirection:'column',
     alignItems:'center',
   },

   iconContainer:{
       backgroundColor:'#007bff', // Color de fondo del ícono
       borderRadius: 9999, // Hace que sea circular
       padding: 8, // Espaciado alrededor del ícono
       justifyContent: 'center',
       alignItems: 'center',
   }
});

export default HomeScreen;