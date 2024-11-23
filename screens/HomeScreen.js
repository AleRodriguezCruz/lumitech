    import React, { useState, useEffect } from 'react';
    import { SafeAreaView, Text, StyleSheet, View, Image, TouchableOpacity, FlatList, Alert, BackHandler } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import FeatherIcon from 'react-native-vector-icons/Feather';
    import axios from 'axios';
    import { useNavigation } from '@react-navigation/native';
    import AsyncStorage from '@react-native-async-storage/async-storage';

    const staticImage = require('../assets/product1.jpg');

const HomeScreen = ({ route, navigation }) => {
  const [rosetas, setRosetas] = useState([]); // Estado para almacenar las rosetas
  const { correo } = route.params || {}; // Extraer correo si está disponible en los parámetros

      useEffect(() => {
        const fetchRosetas = async () => {
          

          try {
              const token = await AsyncStorage.getItem('access_token');
              if (!token) {
                  Alert.alert('Error', 'No se encontró el token de autenticación.');
          return;
        }

            
          const response = await axios.get('https://flaskrosetalummitechapi.vercel.app/api/rosetas/get', {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token en el encabezado
          },
        });
        console.log("Rosetas obtenidas:", response.data);
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
          <View style={[styles.rowIcon, { backgroundColor: item.estado ? '#007bff' : '#ccc' }]} >
            <Ionicons name={item.estado ? "bulb" : "bulb-outline"} size={20} color="#FFD700" />
          </View>
          <Text style={styles.rowLabel}>{item.ubicacion}</Text>
          <View style={styles.rowSpacer} />
          <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
        </TouchableOpacity>
      );

      const handleLogout = () => {
      BackHandler.exitApp(); // Cierra la aplicación
    };


      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Bienvenido a tu Roseta Inteligente</Text>
          </View>

          <Image source={staticImage} style={styles.staticImage} />

          <TouchableOpacity onPress={() => navigation.navigate('Add Device')} style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]} >
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

          <View style={styles.menu}>
            <TouchableOpacity 
              style={styles.menuButton} 
              onPress={() => navigation.navigate('Home', { correo })} // Pasar correo cuando navegas a Home
            >
              <View style={styles.iconContainer}>
                <Ionicons name="home" size={30} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuButton} 
              onPress={() => navigation.navigate('Notifications')}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="notifications" size={30} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuButton} 
              onPress={() => navigation.navigate('Devices', { correo })} // Pasar correo aquí
            >
              <View style={styles.iconContainer}>
                <Ionicons name="settings" size={30} color="#fff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuButton} 
              onPress={handleLogout} // Llama a handleLogout para salir de la app
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
      staticImage:{
        width :'100%',
        height :undefined,
        aspectRatio :16 /9,
        borderRadius :10,
        marginBottom :'5%',
      },
      deviceList:{
        paddingBottom :20,
      },
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
