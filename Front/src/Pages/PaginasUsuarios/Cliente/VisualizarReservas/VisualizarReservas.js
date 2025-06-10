import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';
import VerReserva from "./VerReserva.js"

function HistorialReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const mail = localStorage.getItem('clienteEmail');

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const token = localStorage.getItem('token'); // recupera el token
        const response = await axios.get(`http://localhost:8080/cliente/listar/alquileres`, {
          headers: {
            Authorization: `Bearer ${token}`, // agrega el token en el header
          },
        });
        setReservas(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el historial.');
        setLoading(false);
        console.error(err); // Para debug
      }
    };

    obtenerReservas();
    console.log(reservas)
  }, [mail]);

  const eliminarReserva = (Reserva) => {
    setReservas(prev => prev.filter(reserva => reserva !== Reserva));
  };

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1 className='text-center'>Reservas</h1>
      {reservas.length === 0 ? (
        <p>No hay reservas registradas.</p>
      ) : (
        <div>
            {reservas.map((reserva, index) => (
              <VerReserva key={index} reserva={reserva} eliminarReserva={eliminarReserva}/>
            ))}
        </div>
      )}
    </div>
  );
}

const thStyle = {
  borderBottom: '2px solid #ccc',
  padding: '10px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2'
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee'
};

export default HistorialReservas;