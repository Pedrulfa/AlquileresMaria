import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';

import Vehiculos from '../../VisualizarVehiculoUsuario/VisualizarVehiculoUsuario.js';
import Perfil from '../../MiPerfil/MiPerfil.js';


function Inicio() {
  const navigate = useNavigate();
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const irAPerfil = () => {
    navigate('/perfil');
  };

 
  const irAVehiculos = () => {
    navigate('/vehiculos');
  };


  const cerrarSesion = () => {
    localStorage.removeItem('rol');
    navigate('/');
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
        <div className="nav-left">
          <a href="/empleado" style={{ textDecoration: 'none', color: '#b22222', fontWeight: 'bold' }}>Inicio</a>
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
                  backgroundColor: '#1c1c1c', // fondo negro
                  border: '1px solid #b22222',
                  borderRadius: 6,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  zIndex: 9999,
                  minWidth: 200,
                  overflow: 'hidden'
              }}>
              <button onClick={irAPerfil}
                style={{
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
              }}>
              👤 Mi Perfil
              </button>
              <button onClick={irAVehiculos}
                style={{
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
                }}>
                🚗 Visualizar Vehículos
              </button>
            <button onClick={cerrarSesion}
                style={{
                  padding: '12px 20px',
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: '#ff4d4d',
                  fontWeight: 'bold',
                  fontSize: '14px',
            }}>
              ⛔ Cerrar sesión
            </button>
          </div>)}
      </div>
      </nav>

      <h2 style={{ padding: 20 }}>Bienvenido</h2>

      {/* RUTAS */}
      <Routes>
        <Route path="/vehiculos" element={<Vehiculos />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>

      {/* CONTENIDO PRINCIPAL */}
      <main className="contenido" style={{ padding: 20 }}>
        <h3>Alquileres</h3>
      </main>
    </div>
  );
}

export default Inicio;