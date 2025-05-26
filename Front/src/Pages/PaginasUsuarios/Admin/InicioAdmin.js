import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CargarVehiculo from '../../CargarVehiculo/CargarVehiculo';
import ListadoVehiculos from './listadoTotalDeAutos/VisualizarAutos.js';
import ListadoSucursales from './listadoSucursales/sucursales.js';


function Inicio() {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [vistaActual, setVistaActual] = useState('inicio');
  const navigate = useNavigate();

 
  const cerrarSesion = () => {
    localStorage.removeItem('rol');
    navigate("/");
  };

  // Cambiar vista y cerrar menú
  const cambiarVista = (vista) => {
    setVistaActual(vista);
    setMostrarMenu(false);
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 20px',
          borderBottom: '1px solid #ccc'
        }}
      >
        <div className="nav-left">
          <button
            onClick={() => cambiarVista('inicio')}
            style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'  }}
          >
            Inicio
          </button>
        </div>

        <div className="nav-right" style={{ position: 'relative' }}>
          <button
            onClick={() => setMostrarMenu(!mostrarMenu)}
            style={{
              backgroundColor: '#b22222',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              padding: '8px 12px',
              cursor: 'pointer'
            }}
          >
            Menú ▾
          </button>

          {mostrarMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 5,
              backgroundColor: '#1c1c1c',
              border: '1px solid #b22222',
              borderRadius: 6,
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              zIndex: 9999,
              minWidth: 200
            }}>
              <button onClick={() => cambiarVista('perfil')} style={botonMenu}>👤 Mi Perfil</button>
              <button onClick={() => cambiarVista('vehiculos')} style={botonMenu}>🚗 Visualizar Vehículos</button>
              <button onClick={() => cambiarVista('regEmpleado')} style={botonMenu}>➕ Registrar Empleado</button>
              <button onClick={() => cambiarVista('carVehiculo')} style={botonMenu}>➕ Cargar Vehículo</button>
              <button onClick={cerrarSesion} style={{ ...botonMenu, color: '#ff4d4d' }}>⛔ Cerrar sesión</button>
            </div>
          )}
        </div>
      </nav>

      <h2 style={{ padding: 20 }}>Bienvenida, Maria</h2>
       {vistaActual === 'vehiculos' && <p><ListadoVehiculos/></p>}
         {vistaActual === 'inicio' && <p><ListadoSucursales/></p>}

      {/* CONTENIDO DINÁMICO */}
      <main style={{ padding: 20 }}>
        {vistaActual === 'perfil' && <p>Vista del perfil del usuario.</p>}
        {vistaActual === 'regEmpleado' && <p>Acá va el registro del empleado</p>}
        {vistaActual === 'carVehiculo' && <p><CargarVehiculo/></p>}
      </main>
    </div>
  );
}

const botonMenu = {
  padding: '12px 20px',
  width: '100%',
  background: 'transparent',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  color: 'white',
  fontWeight: 'bold',
  borderBottom: '1px solid #333',
  fontSize: '14px',
};

export default Inicio;