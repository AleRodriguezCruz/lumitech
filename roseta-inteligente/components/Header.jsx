import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="menu" size={24} color="#000" style={styles.menuIcon} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} /> {/* Espacio reservado */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#6200EE', // Cambia el color según tu diseño
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  menuIcon: {
    padding: 10,
  },
  placeholder: {
    width: 40, // Espacio reservado para alinear el título
  },
});

export default Header;
