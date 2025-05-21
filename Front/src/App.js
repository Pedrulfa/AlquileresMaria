import React from 'react';
import './App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Home from './Pages/Home/Home.js';
import IniciarSesion from './Pages/IniciarSesion/IniciarSesion.js';
import Registrarse from './Pages/Registrarse/Registrarse.js';

// COMPONENTES SEGÚN ROL (puedes crear estos como placeholders si aún no existen)
import Admin from './Pages/PaginasUsuarios/Admin/InicioAdmin.js';
import Empleado from './Pages/PaginasUsuarios/Empleado/InicioEmpleado.js';
import Cliente from './Pages/PaginasUsuarios/Cliente/InicioCliente.js';

function App() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;  // Cambia esto según cómo se llama el campo del rol en tu JWT
    } catch (error) {
      console.error('Token inválido:', error);
    }
  }

  // Ocultar navbar en estas rutas (por ejemplo: login o dashboard)
  const NavbarRoutes = ['/'];
  const mostrarNavbar = NavbarRoutes.includes(location.pathname);

  return (
    <>
      {mostrarNavbar && (
        <nav className="navbar">
          <div className="nav-left">
           {/* Por configuracion del css si se saca este div se va todo a la izquierda, lo dejo vacio*/}
          </div>
          <div className="nav-right">
            {!token && (
              <>
                <Link to="/iniciar-sesion">Iniciar sesión</Link>
                <Link to="/registrarse">Registrarse</Link>
                <Link to="/admin">Admin</Link>  
                <Link to="/empleado">Empleado</Link> 
                <Link to="/cliente">Cliente</Link> 
              </>
            )}
            {token && (
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/'; // Recarga y redirige
                }}
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />

        {/* Rutas protegidas por rol */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/cliente" element={<Cliente />} />
      </Routes>
    </>
  );
}

export default App;