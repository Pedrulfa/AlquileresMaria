import React, { useState } from 'react';

const Registrarse = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dni.length < 8 || dni.length > 9) {
      alert('El DNI debe tener entre 8 y 9 caracteres');
      return;
    }
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    // Lógica para registrar
    alert('Registrando usuario...');
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Registrarse</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
          Nombre completo:
          <input type="text" required style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
          Correo electrónico:
          <input type="email" required style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }} />
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
        <button type="submit" style={{ padding: 10, borderRadius: 4, backgroundColor: '#b22222', color: 'white', border: 'none', cursor: 'pointer' }}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registrarse;