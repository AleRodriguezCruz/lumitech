import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';

const ControlDeviceScreen = ({ route, navigation }) => {
  const { deviceName } = route.params; // Obtener el nombre del dispositivo

  // Estado para cada interruptor
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [thermostatEnabled, setThermostatEnabled] = useState(true);
  const [smokeSensorEnabled, setSmokeSensorEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabecera con botón de cancelar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Ionicons name="close-circle" size={30} color="#ff4d4d" />
        </TouchableOpacity>
        <Text style={styles.title}>Controlar {deviceName}</Text>
      </View>

      <View style={styles.controlContainer}>
        <View style={styles.row}>
          <View style={styles.rowIcon}>
            <FeatherIcon name="wifi" size={20} color="#fff" />
          </View>
          <Text style={styles.controlText}>Controlar Wi-Fi</Text>
          <Switch
            onValueChange={() => setWifiEnabled(previousState => !previousState)}
            value={wifiEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={wifiEnabled ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.rowIcon}>
            <FeatherIcon name="thermometer" size={20} color="#fff" />
          </View>
          <Text style={styles.controlText}>Termostato</Text>
          <Switch
            onValueChange={() => setThermostatEnabled(previousState => !previousState)}
            value={thermostatEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={thermostatEnabled ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.rowIcon}>
            <FeatherIcon name="alert-triangle" size={20} color="#fff" />
          </View>
          <Text style={styles.controlText}>Sensor de Humo</Text>
          <Switch
            onValueChange={() => setSmokeSensorEnabled(previousState => !previousState)}
            value={smokeSensorEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={smokeSensorEnabled ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.rowIcon}>
            <FeatherIcon name="camera" size={20} color="#fff" />
          </View>
          <Text style={styles.controlText}>Cámara</Text>
          <Switch
            onValueChange={() => setCameraEnabled(previousState => !previousState)}
            value={cameraEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={cameraEnabled ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30, // Aumentado para separar más del contenido
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    flexGrow: 1,
    textAlign: 'center', // Centra el título
    marginTop: 20, // Aumentado para dar margen superior al título
    marginBottom: 10, // Agregado para dar margen inferior al título
  },
  controlContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15, // Aumentado para dar más espacio entre filas
    width: '100%',
    backgroundColor: '#f2f2f2', // Color de fondo para cada fila
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: '#007bff', // Color de fondo del ícono
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  controlText: {
    marginLeft: 10,
    fontSize: 18,
    flexGrow: 1,
  },
});

export default ControlDeviceScreen;
