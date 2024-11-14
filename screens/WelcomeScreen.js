import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';

// Importar el logo (asegúrate de que la ruta sea correcta)
const logo = require('../assets/logo2.png'); // Cambia la ruta según la ubicación de tu logo

const WelcomeScreen = ({ navigation }) => {
  const letters = "LUMITECH".split(""); // Dividir el texto en letras
  const animations = useRef(letters.map(() => new Animated.Value(0))).current; // Crear un Animated.Value para cada letra

  useEffect(() => {
    // Iniciar las animaciones para cada letra
    const animationsArray = letters.map((_, index) => {
      return Animated.timing(animations[index], {
        toValue: 1,
        duration: 500,
        delay: index * 200, // Retraso basado en el índice
        useNativeDriver: true,
      });
    });

    Animated.parallel(animationsArray).start();
  }, [animations, letters]); // Incluir 'letters' en el array de dependencias

  return (
    <View style={styles.container}>
      {/* Mostrar el logo */}
      <Image source={logo} style={styles.logo} />
      
      <View style={styles.titleContainer}>
        {letters.map((letter, index) => (
          <Animated.Text
            key={index}
            style={{
              ...styles.title,
              opacity: animations[index], // Aplicar la opacidad animada
              transform: [{ translateY: animations[index].interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0] // Mover hacia arriba al aparecer
              })}],
            }}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
      <Text style={styles.subtitle}>Estamos encantados de tenerte aquí.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03045E', // Color de fondo azul fuerte
  },
  logo: {
    width: 150, // Ajusta el ancho según sea necesario
    height: 150, // Ajusta la altura según sea necesario
    marginBottom: 20, // Espacio entre el logo y el título
  },
  titleContainer: {
    flexDirection: 'row', // Alinear las letras en una fila
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white', // Texto blanco
    letterSpacing: 5,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white', // Texto blanco
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff', // Color del botón
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Texto del botón en blanco
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
