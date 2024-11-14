// UsuariosScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';

const UsuariosScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('https://flaskrosetalummitechapi.vercel.app/api/usuarios'); 
        setUsuarios(response.data);
      } catch (err) {
        setError(err.message); // Captura el error
      } finally {
        setLoading(false); // Cambia el estado de carga
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id_usuario.toString()} // Asegúrate de que id_usuario sea único
        renderItem={({ item }) => (
          <Text>{item.nombre} - {item.correo}</Text> // Ajusta esto según los datos que recibas
        )}
      />
    </View>
  );
};

export default UsuariosScreen;
