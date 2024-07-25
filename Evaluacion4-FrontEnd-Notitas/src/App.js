import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [important, setImportant] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const hasRepeatingSequences = (text) => {
    const repeatingPattern = /(.)\1{8,}|(\b\w+\b)(?:.*?\2){8,}/;
    return repeatingPattern.test(text);
  };

  const addNote = () => {
    const errorMessage = document.getElementById('error-message');

    if (title && title.length < 8) {
      errorMessage.innerHTML = 'El título debe tener al menos 8 letras';
      errorMessage.style.display = 'block';
      return;
    }

    if (hasRepeatingSequences(title)) {
      errorMessage.innerHTML = 'Ingrese un título sin palabras o símbolos repetidos varias veces';
      errorMessage.style.display = 'block';
      return;
    }

    if (description.trim() === '') {
      errorMessage.innerHTML = 'El campo descripción es obligatorio';
      errorMessage.style.display = 'block';
      return;
    }

    if (description.length < 8) {
      errorMessage.innerHTML = 'La descripción debe tener al menos 8 letras';
      errorMessage.style.display = 'block';
      return;
    }

    if (hasRepeatingSequences(description)) {
      errorMessage.innerHTML = 'Ingrese una descripción sin palabras o símbolos repetidos varias veces';
      errorMessage.style.display = 'block';
      return;
    }

    if (title.length > 20) {
      errorMessage.innerHTML = 'El título no puede tener más de 20 caracteres';
      errorMessage.style.display = 'block';
      return;
    }

    if (description.length > 50) {
      errorMessage.innerHTML = 'La descripción no puede tener más de 50 caracteres';
      errorMessage.style.display = 'block';
      return;
    }

    const newNote = {
      title,
      description,
      important,
      showFullText: false,
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setTitle('');
    setDescription('');
    setImportant(false);
    errorMessage.innerHTML = '';
    errorMessage.style.display = 'none';
  };

  const toggleFullText = (index) => {
    const updatedNotes = notes.map((note, i) => {
      if (i === index) {
        return { ...note, showFullText: !note.showFullText };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((note, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const closeModal = () => {
    setSelectedNote(null);
  };

  return (
    <div className="container">
      <div className="header d-flex flex-column align-items-center p-3 mb-3">
        <h1 className="simulator">¡Simulador de Post-It!</h1>
        <div className="d-flex flex-column flex-md-row align-items-center">
          <input
            type="text"
            className="form-control mr-md-2 mb-2 mb-md-0"
            placeholder="Título (opcional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="form-control mr-md-2 mb-2 mb-md-0"
            placeholder="Descripción (obligatorio)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ flexGrow: 1 }}
          />
          <div className="custom-checkbox mr-md-2 mb-2 mb-md-0">
            <input
              type="checkbox"
              id="important"
              checked={important}
              onChange={(e) => setImportant(e.target.checked)}
            />
            <label htmlFor="important">
              ¡Importante!
              <svg viewBox="0 0 16 16" className="bi bi-check">
                <path fillRule="evenodd" d="M10.854 5.146a.5.5 0 0 0-.708 0L7 8.293 5.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708z" />
              </svg>
            </label>
          </div>
          <button className="btn btn-dark" onClick={addNote}>
            AGREGAR
          </button>
        </div>
        <div id="error-message" className="error-message mt-3"></div>
      </div>
      <div className="notes d-flex flex-wrap justify-content-center">
        {notes.map((note, index) => (
          <div
            key={index}
            className={`note ${note.important ? 'important' : ''}`}
            onClick={() => handleNoteClick(note)}
          >
            <h3>{note.title}</h3>
            <div className="note-content">
              <p className={note.showFullText ? 'full' : ''}>
                {note.showFullText ? note.description : `${note.description.substring(0, 20)}...`}
              </p>
            </div>
            <div className="note-footer">
              {note.description.length > 20 && (
                <button className="btn btn-link btn-sm text-decoration-none p-0" onClick={(e) => { e.stopPropagation(); toggleFullText(index); }}>
                  {note.showFullText ? 'Ver menos' : 'Ver más'}
                </button>
              )}
              <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); deleteNote(index); }}>Borrar</button>
            </div>
          </div>
        ))}
      </div>
      {selectedNote && (
        <div className="modal" onClick={closeModal}>
          <div className={`modal-content note ${selectedNote.important ? 'important' : ''}`} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNote.title}</h2>
            <p>{selectedNote.description}</p>
            <button className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
