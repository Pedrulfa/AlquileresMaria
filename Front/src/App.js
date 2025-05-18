import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home/Home.js';
import IniciarSesion from './Pages/IniciarSesion/IniciarSesion.js';
import Registrarse from './Pages/Registrarse/Registrarse.js';

function App() {
  return (
    <Router>
      <nav>
        {/* Links para navegar sin recargar la página */}
        <Link to="/">Inicio</Link> | 
        <Link to="/iniciar-sesion">Iniciar sesión</Link> | 
        <Link to="/registrarse">Registrarse</Link> 
      </nav>

      {/* Definición de las rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
      </Routes>
    </Router>
  );
}

export default App;
