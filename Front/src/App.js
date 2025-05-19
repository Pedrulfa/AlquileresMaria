import React from 'react';
import './App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';  // ya no BrowserRouter

import Home from './Pages/Home/Home.js';
import IniciarSesion from './Pages/IniciarSesion/IniciarSesion.js';
import Registrarse from './Pages/Registrarse/Registrarse.js';

import QR from './Pages/Pagar/QR/QR.js';
import Tarjeta from './Pages/Pagar/Tarjeta/Tarjeta.js';

import Admin from './Pages/PaginasUsuarios/Admin/InicioAdmin.js';
import Cliente from './Pages/PaginasUsuarios/Cliente/InicioCliente.js';
import Empleado from './Pages/PaginasUsuarios/Empleado/InicioEmpleado.js';



function App() {
  const location = useLocation();

const ocultarNavbarEn = ['/admin', '/empleado', '/cliente'];

  // Aquí revisa que coincida con la ruta completa (incluyendo el "/")
  const mostrarNavbar = !ocultarNavbarEn.includes(location.pathname);

  return (
    <>
      {mostrarNavbar && (
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/">Inicio</Link>
            <Link to="/tarjeta">Tarjeta</Link>
            <Link to="/qr">QR</Link>
          </div>
          <div className="nav-right">
            <Link to="/iniciar-sesion">Iniciar sesión</Link>
            <Link to="/registrarse">Registrarse</Link>
            <Link to="/admin">admin</Link>
            <Link to="/cliente">cliente</Link>
            <Link to="/empleado">empleado</Link>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/tarjeta" element={<Tarjeta />} />
        <Route path="/qr" element={<QR />} />

        {/* Rutas que no tienen el navbar */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/cliente" element={<Cliente />} />
      </Routes>
    </>
  );
}

export default App;