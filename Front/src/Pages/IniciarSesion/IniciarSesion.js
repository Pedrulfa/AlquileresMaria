import React from 'react';

const IniciarSesion = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para iniciar sesión
    alert('Iniciando sesión...');
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
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
        <button type="submit" style={{ padding: 10, borderRadius: 4, backgroundColor: '#b22222', color: 'white', border: 'none', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default IniciarSesion;