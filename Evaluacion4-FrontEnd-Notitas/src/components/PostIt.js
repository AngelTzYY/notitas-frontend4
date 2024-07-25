// Importaciones necesarias
import React from 'react';
import '../Style/PostIt.css'; // Importa los estilos CSS específicos para el componente PostIt

// Define el componente PostIt que acepta tres props: titulo, descripcion e isImportant
function PostIt({ titulo, descripcion, isImportant }) {
  return (
    // Aplica una clase condicional 'important' si isImportant es verdadero
    <div className={`post-it ${isImportant ? 'important' : ''}`}>
      <h2>{titulo}</h2> {/* Renderiza el título */}
      <p>{descripcion}</p> {/* Renderiza la descripción */}
    </div>
  );
}

// Exporta el componente PostIt para que pueda ser utilizado en otros lugares de la aplicación
export default PostIt;
