import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://34.203.38.177:5000';

function App() {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/apellido`)
      .then(res => res.json())
      .then(data => setNombreCompleto(data.nombre_completo))
      .catch(err => console.error("Error fetching nombre:", err));

    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = () => {
    fetch(`${API_URL}/estudiantes`)
      .then(res => res.json())
      .then(data => setEstudiantes(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching estudiantes:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/estudiantes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matricula, nombre, carrera: 'N/A', grupo: 'N/A' }),
    })
    .then(res => res.json())
    .then(() => {
      setMatricula('');
      setNombre('');
      cargarEstudiantes(); // Recarga la lista
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Proyecto Docker de: {nombreCompleto || "Andre"}</h1>

        <h2>Lista de Estudiantes</h2>
        <ul>
          {estudiantes.map(est => (
            <li key={est.matricula}>
              {est.matricula} - {est.nombre}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <h3>Agregar Estudiante (Prueba de persistencia)</h3>
          <input
            type="text"
            placeholder="Matrícula"
            value={matricula}
            onChange={e => setMatricula(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          <button type="submit">Agregar</button>
        </form>
      </header>
    </div>
  );
}

export default App;