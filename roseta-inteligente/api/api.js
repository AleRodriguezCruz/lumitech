// api/api.js
import axios from 'axios';

const BASE_URL = 'https://flaskrosetalummitechapi.vercel.app/api';

export const fetchDispositivos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dispositivos`);
    // Verifica si la respuesta es exitosa
    if (response.data.code === 0) {
      return response.data.dispositivos; // Asegúrate de que esta propiedad exista en la respuesta
    } else {
      throw new Error(response.data.message); // Lanza un error con el mensaje de la API
    }
  } catch (error) {
    console.error("Error fetching dispositivos:", error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};
