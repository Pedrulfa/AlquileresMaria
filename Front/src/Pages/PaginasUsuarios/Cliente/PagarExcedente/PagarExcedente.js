import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PagarExcedente = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extraemos el excedente del state que se envió con navigate
  const excedente = location.state?.excedente ?? 0; // por si no viene, default 0

  const Pagar = (e) => {
    e.preventDefault();
    console.log('Pago realizado');
  };

  const CerrarSesion = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div>
      <nav>
        <div className="nav-left"></div>
        <div className="nav-right" style={{ textAlign: 'right', padding: '10px 20px' }}>
          <button
            onClick={CerrarSesion}
            style={{
              backgroundColor: '#b22222',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              padding: '8px 12px',
              cursor: 'pointer',
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
      <div
        style={{
          maxWidth: 400,
          margin: '40px auto',
          padding: 20,
          border: '1px solid #ccc',
          borderRadius: 8,
          textAlign: 'center',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontSize: 18,
          color: '#b22222',
          fontWeight: '600',
          lineHeight: 1.4,
        }}
      >
        <h2 style={{ marginBottom: 25, fontWeight: '700' }}>
          Tienes un excedente de:  <br />
          <span style={{ fontSize: 24, fontWeight: '900' }}>${excedente}</span>
        </h2>
        <button
          onClick={Pagar}
          style={{
            backgroundColor: '#b22222',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            padding: '10px 24px',
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: '700',
            display: 'inline-block',
          }}
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default PagarExcedente;