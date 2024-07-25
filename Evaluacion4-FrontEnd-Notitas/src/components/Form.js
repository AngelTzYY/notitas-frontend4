// Importa las funciones necesarias desde React
import React, { useState } from 'react';
import "./form.css"

// Define el componente Form, que recibe una prop llamada agregarNota
function Form({ agregarNota }) {
  // Usa el hook useState para manejar el estado del título, la descripción y la importancia de la nota
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    agregarNota(titulo, descripcion, isImportant); // Llama a la función agregarNota con los valores actuales
    setTitulo(''); // Resetea el estado del título
    setDescripcion(''); // Resetea el estado de la descripción
    setIsImportant(false); // Resetea el estado de importancia
  };

  return (
    // Renderiza el formulario y maneja el evento onSubmit
    <form onSubmit={handleSubmit}>
      {/* Campo de entrada para el título de la nota */}
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)} // Actualiza el estado del título cuando cambia el valor del input
      />
      {/* Campo de entrada para la descripción de la nota */}
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)} // Actualiza el estado de la descripción cuando cambia el valor del input
        required // Campo obligatorio
      />
      {/* Checkbox para marcar la nota como importante */}
      <label>
        Importante
        <input
          type="checkbox"
          checked={isImportant}
          onChange={(e) => setIsImportant(e.target.checked)} // Actualiza el estado de importancia cuando cambia el valor del checkbox
        />
      </label>
      {/* Botón para enviar el formulario */}
      <button type="submit">Agregar</button> {/* Botón para enviar el formulario */}
    </form>
  );
}

// Exporta el componente Form para que pueda ser usado en otros archivos
export default Form;
