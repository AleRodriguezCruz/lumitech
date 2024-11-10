import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';

const ThermostatControl = () => {
  const handleTemperatureChange = (change) => {
    // Aquí puedes agregar la lógica para cambiar la temperatura
    alert(`Cambiar temperatura en ${change}°C`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Control del Termostato</Text>
      <Button title="Aumentar Temperatura" onPress={() => handleTemperatureChange(1)} />
      <Button title="Disminuir Temperatura" onPress={() => handleTemperatureChange(-1)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ThermostatControl;
