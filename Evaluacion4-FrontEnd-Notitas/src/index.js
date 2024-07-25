// Importaciones necesarias
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importa los estilos CSS
import App from './App'; // Importa el componente principal de la aplicación

// Renderiza el componente App dentro del elemento con id 'root' en el DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Selecciona el elemento DOM con el id 'root'
);
