import React, { useState } from 'react';

const RecuperarContrasena = () => {
  const [email, setEmail] = useState('');

  const handleConfirmar = async (e) => {
    e.preventDefault();
    try{
       const response = await fetch(`http://localhost:8080/usuario/recuperarPassword?mail=${email}`, {
        method: 'POST',
      });
       if (response.ok) {
        const data = await response.text();
        alert(data);
      }else {
        const errorText = await response.text();
        alert(errorText);
      }
    }catch (error) {
          console.log('Error cargando datos:', error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Recuperar Contraseña</h2>

      <form onSubmit={handleConfirmar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ fontWeight: 'bold', display: 'flex', flexDirection: 'column' }}>
          Correo electrónico:
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>

        <button
          type="submit"
          style={{ padding: 10, borderRadius: 4, backgroundColor: '#b22222', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default RecuperarContrasena;