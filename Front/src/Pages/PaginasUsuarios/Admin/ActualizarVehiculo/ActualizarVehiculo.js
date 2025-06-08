import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ActualizarVehiculo() {
  const { state } = useLocation();
  const auto = state?.auto;

  const [precioPorDia, setPrecioPorDia] = useState(auto?.precio || '');
  const [estado, setEstado] = useState(auto?.estado || '');
  const [tipoReembolso, setTipoReembolso] = useState(auto?.tipoReembolso || '');
  const [foto, setFoto] = useState(null);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(auto?.sucursal?.id || '');
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await fetch('http://localhost:8080/sucursales');
        if (response.ok) {
          const data = await response.json();
          setSucursales(data);
        } else {
          console.error('Error al obtener sucursales');
        }
      } catch (error) {
        console.error('Error de red al obtener sucursales', error);
      }
    };

    fetchSucursales();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auto) {
      alert('No se recibió información del vehículo.');
      return;
    }

    if (isNaN(precioPorDia) || precioPorDia <= 0) {
      alert('Precio por día debe ser un número positivo');
      return;
    }

    if (!estado.trim()) {
      alert('Debe ingresar el estado');
      return;
    }

    if (!tipoReembolso.trim()) {
      alert('Debe ingresar el tipo de reembolso');
      return;
    }

    if (!sucursalSeleccionada) {
      alert('Debe seleccionar una sucursal');
      return;
    }

    const formData = new FormData();
    formData.append('patente', auto.patente); // identificador del vehículo
    formData.append('precioPorDia', precioPorDia);
    formData.append('estado', estado);
    formData.append('tipoReembolso', tipoReembolso);
    if (foto) formData.append('foto', foto);
    formData.append('sucursalId', sucursalSeleccionada);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/auto/actualizar', {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Vehículo actualizado correctamente');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Actualizar Vehículo</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>
          Precio por día:
          <input
            type="number"
            value={precioPorDia}
            onChange={(e) => setPrecioPorDia(e.target.value)}
            required
            min={0}
            step="0.01"
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Estado:
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          >
            <option value="">Seleccione estado</option>
            <option value="DISPONIBLE">DISPONIBLE</option>
            <option value="EN MANTENIMIENTO">EN MANTENIMIENTO</option>
            <option value="NO DISPONIBLE">NO DISPONIBLE</option>
          </select>
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Tipo de reembolso:
          <select
            value={tipoReembolso}
            onChange={(e) => setTipoReembolso(e.target.value)}
            required
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          >
            <option value="">Seleccione tipo de reembolso</option>
            <option value="COMPLETO">COMPLETO</option>
            <option value="PARCIAL">PARCIAL</option>
          </select>
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Foto del vehículo (opcional):
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
            style={{ marginTop: 5 }}
          />
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Sucursal:
          <select
            value={sucursalSeleccionada}
            onChange={(e) => setSucursalSeleccionada(e.target.value)}
            required
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          >
            <option value="">Seleccione una sucursal</option>
            {sucursales.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre} - {s.estado}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          style={{ padding: 10, borderRadius: 4, backgroundColor: '#b22222', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Confirmar Actualización
        </button>
      </form>
    </div>
  );
}

export default ActualizarVehiculo;