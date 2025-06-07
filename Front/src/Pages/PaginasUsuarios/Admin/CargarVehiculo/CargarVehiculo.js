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
  const [foto, setFoto] = useState(null);
  const [sucursales, setSucursales] = useState([]);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');

  const validarPatente = (pat) => {
    const regex = /^[A-Za-z]{3}\d{3}$/;
    return regex.test(pat);
  };

  const handleSubmit = async (e) => { 
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
    
    if (!foto) {
      alert('Debe seleccionar una foto del vehículo');
      return;
    }

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

    // Preparar datos con FormData
    const formData = new FormData();
    formData.append('patente', patente);
    formData.append('categoria', categoria);
    formData.append('capacidad', capacidad);
    formData.append('precioPorDia', precioPorDia);
    formData.append('modelo', modelo);
    formData.append('marca', marca);
    formData.append('estado', estado);
    formData.append('tipoReembolso', tipoReembolso);
    formData.append('foto', foto); 
    formData.append('sucursalId', sucursalSeleccionada);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8080/auto/crear', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Vehículo cargado con éxito');
        // limpiar formulario
        setPatente('');
        setCategoria('');
        setCapacidad('');
        setPrecioPorDia('');
        setModelo('');
        setMarca('');
        setEstado('');
        setTipoReembolso('');
        setFoto(null);
        e.target.reset(); // limpia el input file
      } else {
        const errorData = await response.json();
        alert(`Error al cargar: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
      console.error(error);
    }
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
          Foto del vehículo:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
            style={{ marginTop: 5 }}
            required
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
          Cargar
        </button>
      </form>
    </div>
  );
}

export default CargarVehiculo;