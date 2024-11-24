# Roseta Inteligente

> **¿Qué es Roseta Inteligente?**  
Roseta Inteligente es una aplicación móvil para administrar dispositivos inteligentes (rosetas). Permite a los usuarios agregar, visualizar y controlar el estado de las rosetas desde su dispositivo móvil.

---

## **Instalación**

> **¿Cómo instalar el proyecto?**

1. Clona el repositorio en tu máquina local:  
   ```bash
   git clone <URL-DEL-REPOSITORIO>
   cd roseta-inteligente
2.Instala las dependencias necesarias:

  npm install

3. Inicia el servidor de desarrollo:

   npm start

    ¿Qué herramientas necesitas?

    Node.js
    Expo CLI (instálalo con npm install -g expo-cli)

4. Librerías utilizadas

    ¿Qué dependencias se usan en el proyecto?

    expo: Framework para construir aplicaciones React Native.
    axios: Realiza solicitudes HTTP.
    @react-navigation/native: Manejo de navegación.
    @react-navigation/stack: Navegación tipo pila.
    @react-navigation/bottom-tabs: Navegación con pestañas inferiores.
    react-native-vector-icons: Iconos para UI.
    @react-native-async-storage/async-storage: Almacenamiento local.
    expo-status-bar: Personalización de la barra de estado.
    expo-camera: Acceso a la cámara del dispositivo.
    react-native-reanimated: Animaciones avanzadas.

    ¿Qué dependencias de desarrollo se incluyen?

    @babel/core: Transpilador de JavaScript.

Estructura del Proyecto

    ¿Cómo está organizado el proyecto?

    App.js: Punto de entrada principal de la aplicación.
    Pantallas: Manejan las diferentes funcionalidades de la aplicación, como HomeScreen y AddDevicesScreen.
    Componentes: Contienen elementos reutilizables de la interfaz de usuario.

Configuración adicional

    ¿Qué debo configurar antes de ejecutar el proyecto?

    Archivos .env:
    Crea un archivo .env para almacenar configuraciones sensibles, como claves de API o URLs del servidor. Asegúrate de que esté incluido en .gitignore.

Preguntas frecuentes

    ¿Por qué existe una carpeta llamada .expo en mi proyecto?
    La carpeta .expo se genera automáticamente cuando inicias el proyecto con el comando expo start.

    ¿Qué contienen los archivos en .expo?

    devices.json: Información sobre los dispositivos que han ejecutado la aplicación.
    packager-info.json: Configuración de los puertos y procesos del servidor.
    settings.json: Configuración del servidor de desarrollo.


  Licencia

Este proyecto está creado por Rodriguez de la Cruz Alejandra y Mayon Cisneros Flor Jazmin

    ¿Debo incluir la carpeta .expo en mi repositorio?
    No. Esta carpeta es específica de tu máquina y ya está añadida a .gitignore.
