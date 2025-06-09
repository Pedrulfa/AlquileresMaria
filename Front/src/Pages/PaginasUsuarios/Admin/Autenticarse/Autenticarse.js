import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Autenticarse = () => {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleConfirmar = async (e) => {
    e.preventDefault();

    // Validar que el código tenga 4 dígitos
    if (!/^\d{4}$/.test(codigo)) {
      setError('El código debe tener exactamente 4 dígitos numéricos');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8080/auth/dobleAutenticacion?cod=${codigo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate('/admin');
      } else {
        const errorText = await response.text();
        alert('Código Incorrecto: ' + errorText);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión con el servidor');
    }
  };

  const Home = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <>
    <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 20px',
          borderBottom: '1px solid #ccc'
        }}>
          <div className="nav-left">
          <button
            onClick={Home}
            style={{ backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', cursor: 'pointer'  }}
          >
            Inicio
          </button>
        </div>
    </nav>
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Ingrese el código de autenticación</h2>

      <form onSubmit={handleConfirmar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column' }}>
          Código:
          <input
            type="text"
            maxLength="4"
            inputMode="numeric"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}

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
          Confirmar
        </button>
      </form>
    </div>
    </>
  );
};

export default Autenticarse;