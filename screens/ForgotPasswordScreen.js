//DeviceScreen.js

import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  Linking
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importamos useNavigation
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageContext } from '../screens/ImageContext';


export default function DevicesScreen() {
  const navigation = useNavigation(); // Obtenemos el objeto de navegación
  const route = useRoute(); // Obtenemos la ruta para recibir parámetros
  const { correo } = route.params || {}; // Extraemos el correo desde los parámetros

  const { avatarSource, setAvatarSource } = useContext(ImageContext); // Usamos el contexto para manejar la imagen
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  // Función para seleccionar imagen
  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permiso Denegado", "No puedes acceder a las fotos sin el permiso.");
      return;
    }

    Alert.alert('Selecciona una opción', 'Elige cómo deseas seleccionar la imagen', [
      {
        text: 'Usar cámara',
        onPress: () => handleLaunchCamera(),
      },
      {
        text: 'Seleccionar de la galería',
        onPress: () => handleLaunchImageLibrary(),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  // Función para manejar la selección de imagen desde la galería
 const handleLaunchImageLibrary = async () => {
  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!pickerResult.canceled && pickerResult.assets?.length > 0) {
    console.log('Image URI:', pickerResult.assets[0].uri); // Debug
    setAvatarSource({ uri: pickerResult.assets[0].uri });
  }
};

const handleLaunchCamera = async () => {
  const cameraResult = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 1,
  });

  if (!cameraResult.canceled && cameraResult.assets?.length > 0) {
    console.log('Camera Image URI:', cameraResult.assets[0].uri); // Debug
    setAvatarSource({ uri: cameraResult.assets[0].uri });
  }
};

// Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Aquí puedes hacer lo necesario para cerrar sesión, por ejemplo, eliminar el token de autenticación
    // o redirigir al usuario a la pantalla de inicio de sesión:
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Cerrar sesión',
        onPress: () => {
          navigation.replace('LoginScreen'); // Redirigir a la pantalla de login (ajusta el nombre de la pantalla según corresponda)
        },
      },
    ]);
  };

 // Función para manejar el redireccionamiento a la página de contacto
  const handleContactUs = () => {
    // Reemplaza esta URL con la página web de contacto que desees
    const contactUrl = 'https://landing-page-kappa-cyan.vercel.app/';
    Linking.openURL(contactUrl).catch((err) =>
      console.error("Error al abrir la URL: ", err)
    );
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Botón de regresar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Acción para regresar
      >
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.profile}>
        <TouchableOpacity onPress={handleSelectImage}>
          <View style={styles.profileAvatarWrapper}>
            <Image
              alt=""
              source={avatarSource} // Usar el estado para la imagen
              style={styles.profileAvatar}
            />
            <TouchableOpacity onPress={handleSelectImage}>
              <View style={styles.profileAction}>
                <FeatherIcon color="#fff" name="edit-3" size={15} />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View>
          <Text style={styles.profileName}>{correo || ""}</Text>

        </View>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>


          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#fff' }]}>
              <FeatherIcon color="#000" name="at-sign" size={20} />
            </View>
            <Text style={styles.rowLabel}>Notificaciones-Email</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={emailNotifications => setForm({ ...form, emailNotifications })}
              value={form.emailNotifications}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#fff' }]}>
              <FeatherIcon color="#000" name="bell" size={20} />
            </View>
            <Text style={styles.rowLabel}>Notificaciones</Text>
            <View style={styles.rowSpacer} />
            <Switch
              onValueChange={pushNotifications => setForm({ ...form, pushNotifications })}
              value={form.pushNotifications}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recursos</Text>

          <TouchableOpacity onPress={() => { /* handle onPress */ }} style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#fff' }]}>
              <FeatherIcon color="#000" name="flag" size={20} />
            </View>
            <Text style={styles.rowLabel}>Reportar Bug</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleContactUs} style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#fff' }]}>
              <FeatherIcon color="#000" name="mail" size={20} />
            </View>
            <Text style={styles.rowLabel}>Contáctanos</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { /* handle onPress */ }} style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#fff' }]}>
              <FeatherIcon color="#000" name="star" size={20} />
            </View>
            <Text style={styles.rowLabel}>Calificar en App Store</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
    marginTop: 40,
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',

  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1
  },
  /** Botón Cerrar Sesión */
  logoutButton: {
    backgroundColor: '#FF4C4C', // Color rojo para llamar la atención
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
