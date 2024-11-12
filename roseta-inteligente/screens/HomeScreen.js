import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';

// Imágenes estáticas
const staticImage = require('../assets/product1.jpg');

const HomeScreen = ({ navigation }) => {
  const [rosetas, setRosetas] = useState([]); // Estado para almacenar las rosetas

  useEffect(() => {
    // Cargar rosetas desde la API
    const fetchRosetas = async () => {
      try {
        const response = await axios.get('https://flaskrosetalummitechapi.vercel.app/api/rosetas');
        console.log("Rosetas obtenidas:", response.data); // Imprimir datos obtenidos
        setRosetas(response.data); // Asumiendo que la respuesta es un array de rosetas
      } catch (error) {
        console.error("Error al cargar rosetas:", error);
        Alert.alert('Error', 'No se pudieron cargar las rosetas.');
      }
    };

    fetchRosetas();
  }, []); // Solo se ejecuta una vez al montar el componente

  const renderDevice = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Control Device', { deviceId: item.id_roseta })} style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: item.estado ? '#007bff' : '#ccc' }]}>
        <Ionicons name={item.estado ? "bulb" : "bulb-outline"} size={20} color="#FFD700" />
      </View>
      <Text style={styles.rowLabel}>{item.ubicacion}</Text>
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

      {rosetas.length > 0 ? (
        <FlatList
          data={rosetas}
          renderItem={renderDevice}
          keyExtractor={(item) => item.id_roseta.toString()} // Asegúrate de que el ID sea una cadena
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
          onPress={() => handleLogout()}
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
    paddingBottom: 120,
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
    textAlign:'center',
  },
  
   /** Botón Agregar Dispositivo */
   row:{
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'flex-start',
     height:50,
     backgroundColor:'#f2f2f2',
     borderRadius:8,
     marginBottom:12,
     paddingHorizontal:12,
   },
   rowIcon:{
     width:32,
     height:32,
     borderRadius :9999,
     marginRight :12,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'center',
   },
   rowLabel:{
     fontSize :17,
     fontWeight :'400',
     color:'#0c0c0c',
   },
   rowSpacer:{
     flexGrow :1,
     flexShrink :1,
     flexBasis :0,
   },

   /** Imagen estática */
   staticImage:{
     width :'100%',
     height :undefined,
     aspectRatio :16 /9,
     borderRadius :10,
     marginBottom :'5%',
   },

   /** Lista de dispositivos */
   deviceList:{
     paddingBottom :20,
   },

   /** Menú */
   menu:{
     flexDirection :'row',
     justifyContent :'space-around',
     backgroundColor :'#007bff',
     paddingVertical :'2%',
     position :'absolute',
     bottom :0,
     left :0,
     right :0,
   },
   
   menuButton:{
     flexDirection :'column',
     alignItems :'center',
   },

   iconContainer:{
       backgroundColor :'#007bff',
       borderRadius :9999,
       padding :8,
       justifyContent :'center',
       alignItems :'center',
   }
});

export default HomeScreen;
