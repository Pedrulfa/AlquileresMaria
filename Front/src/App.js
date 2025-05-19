import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home/Home.js';
import IniciarSesion from './Pages/IniciarSesion/IniciarSesion.js';
import Registrarse from './Pages/Registrarse/Registrarse.js';

import QR from './Pages/Pagar/QR/QR.js';
import Tarjeta from './Pages/Pagar/Tarjeta/Tarjeta.js';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="nav-left">
            <Link to="/">Inicio</Link>
            <Link to="/tarjeta">Tarjeta</Link> {/* Esta para ver como queda el pagar qr y tarjeta */}
            <Link to="/qr">QR</Link>
        </div>

        <div className="nav-right">
            <Link to="/iniciar-sesion">Iniciar sesión</Link>
            <Link to="/registrarse">Registrarse</Link>
        </div>
      </nav>

      {/* Definición de las rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/tarjeta" element={<Tarjeta />} />
        <Route path="/qr" element={<QR />} />
      </Routes>
    </Router>
  );
}

export default App;
