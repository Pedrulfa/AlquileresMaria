//Hay que ver como hacer para detectar que el mail ingresado es el del admin y relizar el correspondiente proceso

import React, { useState } from 'react';
import RecuperarContraseña from '../RecuperarContraseña/RecuperarContraeña.js';

const IniciarSesion = () => {
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Iniciando sesión...');
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      {!mostrarRecuperar ? (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
              Correo electrónico:
              <input type="email" required style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
              Contraseña:
              <input type="password" required style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }} />
            </label>
            <button
              type="submit"
              style={{ padding: 10, borderRadius: 4, backgroundColor: '#b22222', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              Ingresar
            </button>
          </form>
          <p style={{ marginTop: 10, textAlign: 'center' }}>
            <button
              onClick={() => setMostrarRecuperar(true)}
              style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
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
              style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
            >
              Volver al inicio de sesión
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default IniciarSesion;