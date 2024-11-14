import React from 'react';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';

const SmokeSensorControl = () => {
  const handleSensorCheck = () => {
    // Aquí puedes agregar la lógica para verificar el sensor de humo
    alert("Verificando sensor de humo...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Control del Sensor de Humo</Text>
      <Button title="Verificar Sensor" onPress={handleSensorCheck} />
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

export default SmokeSensorControl;
