import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NotificationsScreen = ({ navigation }) => {
  const [temperature, setTemperature] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Simulando un sensor de temperatura
    const interval = setInterval(() => {
      const simulatedTemperature = Math.random() * (40 - 20) + 20; // Simula una temperatura entre 20°C y 40°C
      setTemperature(simulatedTemperature);

      // Detección de humo basada en temperatura
      if (simulatedTemperature > 35) { // Umbral para detección de humo
        setAlertMessage("¡Alerta! Detección de humo posible por alta temperatura.");
        setAlertVisible(true);
      }
    }, 2000); // Cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Monitoreo de Sensores</Text>
      <Text>Temperatura: {temperature ? `${temperature.toFixed(2)} °C` : "Cargando..."}</Text>

      {alertVisible && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{alertMessage}</Text>
          <Button title="Cerrar Alerta" onPress={closeAlert} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  alertContainer: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    padding: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
  },
  alertText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default NotificationsScreen;
