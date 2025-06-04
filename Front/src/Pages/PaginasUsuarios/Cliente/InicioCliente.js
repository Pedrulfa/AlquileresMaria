import React, { useState } from 'react';
import Reservas from './VisualizarReservas/VisualizarReservas.js';
import RealizarReserva from '../../RealizarReserva/Home/Home.js';
import { useNavigate } from 'react-router-dom';

function Inicio() {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [vistaActual, setVistaActual] = useState('inicio');

  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    console.log("Cerrando sesion")
    navigate('/'); 
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
        <div className="nav-left">
          <button onClick={() => setVistaActual('inicio')} style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer' }}>
            Inicio
          </button>
        </div>

        <div className="nav-right" style={{ position: 'relative' }}>
          <button
            onClick={() => setMostrarMenu(!mostrarMenu)}
            style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer' }}
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
              <button onClick={() => setVistaActual('perfil')} style={botonMenu}>👤 Mi Perfil</button>
              <button onClick={() => setVistaActual('reservas')} style={botonMenu}>🟦 Ver mis reservas</button>
              <button onClick={cerrarSesion} style={{ ...botonMenu, color: '#ff4d4d' }}>⛔ Cerrar sesión</button>
            </div>
          )}
        </div>
      </nav>

      {vistaActual === 'inicio' && <RealizarReserva/>}

      {/* CONTENIDO DINÁMICO */}
      <main style={{ padding: 10 }}>
        {vistaActual === 'perfil' && <p>Perfil</p>}
        {vistaActual === 'reservas' && <Reservas/>}
      </main>
    </div>
  );
}

// Estilo común de los botones del menú
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
