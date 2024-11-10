import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';

const CameraControl = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isIPCamera, setIsIPCamera] = useState(false); 
  const ipCameraUrl = "http://192.168.0.62"; // Reemplaza con la URL de tu cámara IP

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No se puede acceder a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de Cámara</Text>
      
      {!isIPCamera ? (
        <Camera
          ref={cameraRef}
          style={styles.preview}
          type={Camera.Constants.Type.back}
        />
      ) : (
        <Video 
          source={{ uri: ipCameraUrl }} // URL de la cámara IP
          style={styles.videoPlaceholder}
          resizeMode="contain"
          isLooping
          shouldPlay
        />
      )}

      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setIsIPCamera(!isIPCamera)} 
      >
        <Text style={styles.buttonText}>
          {isIPCamera ? "Usar Cámara del Dispositivo" : "Usar Cámara IP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos para los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    width: '80%', 
    height: 40,
    backgroundColor: '#04fff0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
});

// Exporta el componente CameraControl
export default CameraControl;
