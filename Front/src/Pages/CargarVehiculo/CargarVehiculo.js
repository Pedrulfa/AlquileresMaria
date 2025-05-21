import React, { useState } from 'react';

function CargarVehiculo() {
  const [patente, setPatente] = useState('');
  const [categoria, setCategoria] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [precioPorDia, setPrecioPorDia] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [estado, setEstado] = useState('');
  const [tipoReembolso, setTipoReembolso] = useState('');

  const validarPatente = (pat) => {
    const regex = /^[A-Za-z]{3}\d{3}$/;
    return regex.test(pat);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarPatente(patente)) {
      alert('La patente debe tener formato: 3 letras seguidas de 3 números, ejemplo ABC123');
      return;
    }

    if (!categoria.trim()) {
      alert('Debe ingresar una categoría');
      return;
    }

    if (isNaN(capacidad) || capacidad <= 0) {
      alert('Capacidad debe ser un número positivo');
      return;
    }

    if (isNaN(precioPorDia) || precioPorDia <= 0) {
      alert('Precio por día debe ser un número positivo');
      return;
    }

    if (!modelo.trim()) {
      alert('Debe ingresar el modelo');
      return;
    }

    if (!marca.trim()) {
      alert('Debe ingresar la marca');
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

    alert('Vehículo cargado con éxito');

    setPatente('');
    setCategoria('');
    setCapacidad('');
    setPrecioPorDia('');
    setModelo('');
    setMarca('');
    setEstado('');
    setTipoReembolso('');
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Cargar Vehículo</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>
          Patente:
          <input
            type="text"
            value={patente}
            onChange={(e) => setPatente(e.target.value.toUpperCase())}
            maxLength={6}
            required
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc', textTransform: 'uppercase' }}
            placeholder="ABC123"
          />
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Categoría:
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Capacidad:
          <input
            type="number"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            required
            min={1}
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>

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
          Modelo:
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Marca:
          <input
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Estado:
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
            placeholder="Ej: Disponible, En mantenimiento"
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Tipo de reembolso:
          <input
            type="text"
            value={tipoReembolso}
            onChange={(e) => setTipoReembolso(e.target.value)}
            required
            placeholder="Ej: Completo, Parcial"
            style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
          />
        </label>

        <button
          type="submit"
          style={{ padding: 10, borderRadius: 4, backgroundColor: '#b22222', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Cargar
        </button>
      </form>
    </div>
  );
}

export default CargarVehiculo;