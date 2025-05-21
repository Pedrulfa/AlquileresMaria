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
            <a href="/admin">Inicio</a>
          </div>
        <div className="nav-right">
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      </nav>
      <h2>Bienvenida, Maria</h2> 

      {/* CUERPO CON LISTADO */}
      <main className="contenido">
        <h3>Sucursales </h3>
      </main>
    </div>
  );
}

export default Inicio;