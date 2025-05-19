import React from 'react';
import { useNavigate } from 'react-router-dom';



function Inicio() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('rol');
    navigate('/'); // Volver al home o login
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <h2>Bienvenido, Empleado</h2>
        </div>
        <div className="nav-right">
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      </nav>

      <main className="contenido">
            <h2>Listado de alquileres</h2>
            ListadoVehiculos;
      </main>
    </div>
  );
}

export default Inicio;