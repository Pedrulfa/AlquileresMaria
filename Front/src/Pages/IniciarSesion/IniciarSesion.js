import React, { useState } from 'react';
import RecuperarContraseña from '../RecuperarContraseña/RecuperarContraeña.js';
import { useNavigate } from 'react-router-dom';

const IniciarSesion = () => {
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Detección de admin
    if (email === 'admin@admin.com') {
      alert('Bienvenido administrador');
      // Aquí podrías redirigir, cambiar navbar, etc.
    } else {
      alert('Iniciando sesión como usuario');
    }
  };
  const navigate = useNavigate();
  const Registrarse = () => {
      navigate('/registrarse'); // Volver al home o login
  };
  
  const Inicio = () => {
      navigate('/'); // Volver al home o login
  };

  return (
    <>
      <nav>
        <div className="nav-left">
          <button onClick={Inicio}>Inicio</button>
        </div>
        <div className="nav-right">
          <button onClick={Registrarse}>Registrarse</button>
        </div>

      </nav>
      <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
        {!mostrarRecuperar ? (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Iniciar Sesión</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
                Correo electrónico:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
                Contraseña:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
                />
              </label>
              <button
                type="submit"
                style={{
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#b22222',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Ingresar
              </button>
            </form>
            <p style={{ marginTop: 10, textAlign: 'center' }}>
              <button
                onClick={() => setMostrarRecuperar(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </p>
          </>
        ) : (
          <>
            <RecuperarContraseña />
            <p style={{ marginTop: 10, textAlign: 'center' }}>
              <button
                onClick={() => setMostrarRecuperar(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                Volver al inicio de sesión
              </button>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default IniciarSesion;