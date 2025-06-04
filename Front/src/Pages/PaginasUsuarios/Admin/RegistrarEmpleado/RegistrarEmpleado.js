import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrarEmpleado = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [mail, setMail] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dni.length < 8 || dni.length > 9) {
      alert('El DNI debe tener entre 8 y 9 caracteres');
      return;
    }


    const cliente = {
      nombre: nombre,
      apellido: apellido,
      mail: mail,
      telefono: telefono,
      dni: dni,
    };

    try {
      const response = await fetch('http://localhost:8080/admin/registrarEmpleado', { /*No existe el endpoint es para el proximo sprint */
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        alert('Empleado registrado con éxito');
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


  return (
    <>
      <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Registrar empleado</h2>
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
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
              style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
            Telefono:
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
              minLength={6}
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
            Sucursal:
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
              style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
              maxLength={9}
            />
          </label> {/*Hay que pedir las sucursales y que el boton muestre la lista de sucursales */}
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
            Registrar
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrarEmpleado;