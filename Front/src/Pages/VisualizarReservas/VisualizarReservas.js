import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistorialReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Suponemos que el id del cliente está guardado en localStorage
  const clienteId = localStorage.getItem('clienteId');

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reservas/cliente/${clienteId}`);
        setReservas(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el historial.');
        setLoading(false);
      }
    };

    obtenerReservas();
  }, [clienteId]);

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Historial de Reservas</h2>
      {reservas.length === 0 ? (
        <p>No hay reservas registradas.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Vehículo</th>
              <th style={thStyle}>Fecha Inicio</th>
              <th style={thStyle}>Fecha Fin</th>
              <th style={thStyle}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td style={tdStyle}>{reserva.vehiculo}</td>
                <td style={tdStyle}>{reserva.fechaInicio}</td>
                <td style={tdStyle}>{reserva.fechaFin}</td>
                <td style={tdStyle}>{reserva.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
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