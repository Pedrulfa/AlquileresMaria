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
            <a href="/cliente">Inicio</a>
          </div>
        <div className="nav-right">
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      </nav>
      <h2>Bienvenido, Cliente</h2> {/*Se podria mostrar el nombre del cliente*/}

      {/* CUERPO CON LISTADO */}
      <main className="contenido">
        <h3>Lista de autos </h3>
      </main>
    </div>
  );
}

export default Inicio;