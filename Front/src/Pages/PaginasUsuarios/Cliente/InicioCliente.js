import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Perfil from '../../MiPerfil/MiPerfil.js';
import Reservas from '../../VisualizarReservas/VisualizarReservas.js';

function Inicio() {
  const navigate = useNavigate();
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const irAPerfil = () => {
    navigate('/perfil');
  };

  const visualizarReservas = () => {
    navigate('/reservas');
  };

  const irAVehiculos = () => {
    navigate('/reservas');
  };

  const irACargarVehiculo = () => {
    navigate('/reservas');
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
          <a href="/cliente" style={{ textDecoration: 'none', color: '#b22222', fontWeight: 'bold' }}>Inicio</a>
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
                ???????
              </button>
              <button onClick={visualizarReservas}
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
              🟦 Ver mis reservas
              </button>
              <button onClick={irACargarVehiculo}
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
              ????
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
        <Route path="/regEmpleado" element={<Reservas />} />
        <Route path="/vehiculos" element={<Reservas />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cargarVehiculo" element={<Reservas/>} />
      </Routes>

      {/* CONTENIDO PRINCIPAL */}
      <main className="contenido" style={{ padding: 20 }}>
        <h3>Autos</h3>
      </main>
    </div>
  );
}

export default Inicio;