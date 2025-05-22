import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registrarse = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dni.length < 8 || dni.length > 9) {
      alert('El DNI debe tener entre 8 y 9 caracteres');
      return;
    }

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const cliente = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      dni: dni,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8080/cliente/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        alert('Cliente registrado con éxito');
        navigate('/iniciar-sesion');
      } else {
        const errorText = await response.text();
        alert('Error al registrar: ' + errorText);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      alert('Error de conexión con el servidor');
    }
  };

  const Iniciar = () => {
    navigate('/iniciar-sesion');
  };

  const Inicio = () => {
    navigate('/');
  };

  return (
    <>
      <nav>
        <div className="nav-left">
          <button onClick={Inicio} style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Inicio</button>
        </div>
        <div className="nav-right">
          <button onClick={Iniciar} style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'}}>Iniciar sesión</button>
        </div>
      </nav>

      <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Registrarse</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
            Apellido:
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </label>
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
            DNI:
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
              style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
              maxLength={9}
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
              minLength={6}
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
            Registrarse
          </button>
        </form>
      </div>
    </>
  );
};

export default Registrarse;