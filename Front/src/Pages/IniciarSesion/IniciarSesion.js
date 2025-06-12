import React, { useState } from 'react';
import RecuperarContraseña from '../RecuperarContraseña/RecuperarContraseña.js';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const IniciarSesion = () => {
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      mail: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del backend:", data); 

        // Extraer el token correctamente
        const token = typeof data.accessToken === 'string'
          ? data.accessToken
          : data.accessToken?.value;

        if (typeof token === 'string' && token.trim() !== '') {
          localStorage.setItem('token', token);
          localStorage.setItem('clienteEmail', email);

          const decoded = jwtDecode(token);
          const rol = decoded.roles;

          switch (rol) {
            case 'ROLE_ADMIN':
              navigate('/autenticarse');
              break;

            case 'ROLE_CLIENT':
             const excedenteResponse = await fetch('http://localhost:8080/cliente/multa', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
              if (excedenteResponse.ok) {
                const tieneExcedente = await excedenteResponse.json();
                if (tieneExcedente > 0) {
                  navigate('/pagarExcedente', { state: { excedente: tieneExcedente } });
                } else {
                  const destino = localStorage.getItem("redirectAfterLogin");
                  if (destino) {
                    localStorage.removeItem("redirectAfterLogin");
                    navigate(destino);
                  }
                  else{
                    navigate('/cliente');
                  }
                }
              } else {
                alert('Error al pedir el excedente');
              }
              break;

            case 'ROLE_EMPLEADO':
              navigate('/empleado');
              break;

            default:
              alert('Rol desconocido');
              break;
          }
        } else {
          alert('Token inválido recibido del servidor.');
        }
      } else {
        const errorText = await response.text();
        alert('Error al iniciar sesión: ' + errorText);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      alert('Error de conexión con el servidor', error);
    }
  };

  const Registrarse = () => navigate('/registrarse');
  const Inicio = () => navigate('/');

  return (
    <>
      <nav>
        <div className="nav-left">
          <button onClick={Inicio} style={botonEstilo}>Inicio</button>
        </div>
        <div className="nav-right">
          <button onClick={Registrarse} style={botonEstilo}>Registrarse</button>
        </div>
      </nav>

      <div style={contenedorEstilo}>
        {!mostrarRecuperar ? (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={labelEstilo}>
                Correo electrónico:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputEstilo}
                />
              </label>
              <label style={labelEstilo}>
                Contraseña:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={inputEstilo}
                />
              </label>
              <button type="submit" style={botonEstilo}>Ingresar</button>
            </form>
            <p style={{ marginTop: 10, textAlign: 'center' }}>
              <button
                onClick={() => setMostrarRecuperar(true)}
                style={linkEstilo}
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
                style={linkEstilo}
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

// 🎨 Estilos reutilizables
const botonEstilo = {
  backgroundColor: '#b22222',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  padding: '8px 12px',
  cursor: 'pointer'
};

const inputEstilo = {
  padding: 8,
  marginTop: 5,
  borderRadius: 4,
  border: '1px solid #ccc'
};

const labelEstilo = {
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 'bold'
};

const contenedorEstilo = {
  maxWidth: 400,
  margin: '40px auto',
  padding: 20,
  border: '1px solid #ccc',
  borderRadius: 8
};

const linkEstilo = {
  background: 'none',
  border: 'none',
  color: '#007bff',
  cursor: 'pointer',
  textDecoration: 'underline',
  padding: 0
};

export default IniciarSesion;