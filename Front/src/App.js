import React from 'react';
import './App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Home from './Pages/RealizarReserva/Home/Home.js';
import SeleccionarAuto from './Pages/RealizarReserva/SeleccionarAuto/SeleccionarAuto.js';

import IniciarSesion from './Pages/IniciarSesion/IniciarSesion.js';
import Registrarse from './Pages/Registrarse/Registrarse.js';

// COMPONENTES SEGÚN ROL (puedes crear estos como placeholders si aún no existen)
import Admin from './Pages/PaginasUsuarios/Admin/InicioAdmin.js';

import Empleado from './Pages/PaginasUsuarios/Empleado/InicioEmpleado.js';

import Cliente from './Pages/PaginasUsuarios/Cliente/InicioCliente.js';
import Perfil from './Pages/MiPerfil/MiPerfil.js';
import Reservas from './Pages/VisualizarReservas/VisualizarReservas.js';
import RegEmpleado from './Pages/RegistrarEmpleado/RegistrarEmpleado.js';
import Vehiculos from './Pages/VisualizarVehiculoAdmin/VisualizarVehiculoAdmin.js';


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
                <Link to="/iniciar-sesion" style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Iniciar sesión</Link>
                <Link to="/registrarse" style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Registrarse</Link>
                <Link to="/admin" style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Admin</Link>  
                <Link to="/empleado" style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Empleado</Link> 
                <Link to="/cliente" style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Cliente</Link> 
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
        {/* Rutas para hacer una reserva */}
        <Route path="/" element={<Home />} />
        <Route path="/seleccionar-auto" element={<SeleccionarAuto />} />

        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />

        {/* Rutas protegidas por rol */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/empleado" element={<Empleado />} />
        <Route path="/cliente" element={<Cliente />} />

        {/*Pongo todas las rutas acá porque sino no me funciona el navigate*/}
        <Route path="/vehiculos" element={<Reservas />} />
        <Route path="/perfil" element={<Perfil />} />

        {/*Admin*/}
        <Route path="/regEmpleado" element={<RegEmpleado />} />
        <Route path="/vehiculosAdmin" element={<Vehiculos />} />
      </Routes>
    </>
  );
}

export default App;