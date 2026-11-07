import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Validación de invariantes
if (!document.getElementById('root')) {
  throw new Error('No se encontró el elemento root en el DOM');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Manejo global de errores no capturados
window.addEventListener('error', (event) => {
  console.error('Error no capturado:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesa rechazada no manejada:', event.reason);
});

// Configuración de Axios para manejar errores globalmente
import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Errores del servidor (4xx, 5xx)
      console.error('Error en la respuesta:', error.response.status, error.response.data);
    } else if (error.request) {
      // Errores de red
      console.error('Error de red:', error.message);
    } else {
      // Otros errores
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Registro de servicio worker en producción
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((registrationError) => {
      console.error('Fallo en el registro del SW:', registrationError);
    });
  });
}