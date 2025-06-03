import React from 'react';
import './App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './Pages/Home/Home.js'
import SeleccionarAuto from './Pages/RealizarReserva/SeleccionarAuto/SeleccionarAuto.js';
import SeleccionarConductor from './Pages/RealizarReserva/SeleccionarConductor/SeleccionarConductor.js';
import ConsultarDisponibilidad from './Pages/RealizarReserva/Home/FlotaAutos/ConsultarDisponibilidad/ConsultarDisponibilidad.js';


import IniciarSesion from './Pages/IniciarSesion/IniciarSesion.js';
import Registrarse from './Pages/Registrarse/Registrarse.js';

// COMPONENTES SEGÚN ROL 
import Admin from './Pages/PaginasUsuarios/Admin/InicioAdmin.js';
import Autenticarse from './Pages/PaginasUsuarios/Admin/Autenticarse/Autenticarse.js';
import RegEmpleado from './Pages/PaginasUsuarios/Admin/RegistrarEmpleado/RegistrarEmpleado.js';

import Empleado from './Pages/PaginasUsuarios/Empleado/InicioEmpleado.js';

import Cliente from './Pages/PaginasUsuarios/Cliente/InicioCliente.js';
import Perfil from './Pages/MiPerfil/MiPerfil.js';
import PagarExcedente from './Pages/PaginasUsuarios/Cliente/PagarExcedente/PagarExcedente.js';



function App() {
  const location = useLocation();

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
                <Link to="/iniciar-sesion" style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Iniciar sesión</Link>
                <Link to="/registrarse" style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Registrarse</Link>
                <Link to="/admin" style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Admin</Link>  
                <Link to="/pagarExcedente" style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Empleado</Link> 
                <Link to="/cliente" style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Cliente</Link> 
          </div>
        </nav>
      )}

      <Routes>
        {/* Rutas para hacer una reserva */}
        <Route path="/" element={<Home />} />
        <Route path="/seleccionar-auto" element={<SeleccionarAuto />} />
        <Route path="/seleccionar-conductor" element={<SeleccionarConductor />} />
        <Route path="/consultar-disponibilidad" element={<ConsultarDisponibilidad />} />

        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />

        {/* Rutas protegidas por rol */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/regEmpleado" element={<RegEmpleado />} />*
        <Route path="/autenticarse" element={<Autenticarse />} />
        
        <Route path="/empleado" element={<Empleado />} />


        <Route path="/cliente" element={<Cliente />} />
        <Route path="/pagarExcedente" element={<PagarExcedente />} />

        {/*Pongo todas las rutas acá porque sino no me funciona el navigate*/}
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </>
  );
}

export default App;