import React, { useState } from 'react';
import RecuperarContraseña from '../RecuperarContraseña/RecuperarContraeña.js';
import { Route, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const IniciarSesion = () => {
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Guardar token
        localStorage.setItem('token', token);

        // Decodificar token
        const decoded = jwtDecode(token);
        const rol = decoded.role; // Cambia esto según el nombre real del campo en el token
        const userId = decoded.id; // Tomar id del cliente

        // Redirigir según el rol
        switch (rol) {
          case 'admin':
            navigate('/autenticarse');
            break;

          case 'cliente':
             // Consultar si tiene excedente
          const excedenteResponse = await fetch(`http://localhost:8080/checkOut/notificacion/multa`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (excedenteResponse.ok) {
            const tieneExcedente = await excedenteResponse.json(); // numero

            if (tieneExcedente > 0) {
              navigate('/pagarExcedente', { state: { excedente: tieneExcedente } });
            } 
            else {
              navigate('/cliente');
            }
          } 
          else {
            alert('Error al pedir el excedente');
          }
          break;

          case 'empleado':

            navigate('/empleado');
            break;
          default:
            alert('Rol desconocido');  /*Para testear el como llega el rol*/
            break;
        }
      } else {
        const errorText = await response.text();
        alert('Error al iniciar sesión: ' + errorText);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      alert('Error de conexión con el servidor');
    }
  };

  const Registrarse = () => {
    navigate('/registrarse');
  };

  const Inicio = () => {
    navigate('/');
  };

  return (
    <>
      <nav>
        <div className="nav-left">
          <button onClick={Inicio} style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer' }}>Inicio</button>
        </div>
        <div className="nav-right">
          <button onClick={Registrarse} style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer' }}>Registrarse</button>
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