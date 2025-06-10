import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function ActualizarVehiculo() {
  const { state } = useLocation();
  const auto = state?.auto;
  const sucursal = auto?.sucursal
  const navigate = useNavigate()
  console.log(auto)

  const [precioPorDia, setPrecioPorDia] = useState(auto?.precioPorDia || '');
  const [estado, setEstado] = useState(auto?.estado || '');
  const [tipoReembolso, setTipoReembolso] = useState(auto?.rembolso || '');
  const [tipoCategoria , setTipoCategoria] = useState(auto?.categoria || '')
  const [foto, setFoto] = useState(auto?.endpointImagen || null);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(auto?.sucursal || '');
  const [sucursales, setSucursales] = useState([]);
  const [categorias, setCategorias] = useState([])
  const [rembolso, setRembolso] = useState([])
  const [estados, setEstados] = useState([])
  const token = localStorage.getItem("token")

  const handleVolver = () =>{
    navigate("/Admin/listadoTotalDeAutos/VisualizarAuto.js", { state: {sucursal}} )
  }

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/sucursal/listar',{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
        );
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

    const fetchCategoria = async () => {
      try {
        const response = await fetch('http://localhost:8080/auto/get/categorias',{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
        );
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
        } else {
          console.error('Error al obtener categorias');
        }
      } catch (error) {
        console.error('Error de red al obtener las categorias', error);
      }
    };

    const fetchRembolso = async () => {
      try {
        const response = await fetch('http://localhost:8080/auto/get/rembolsos',{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
        );
        if (response.ok) {
          const data = await response.json();
          setRembolso(data);
        } else {
          console.error('Error al obtener rembolso');
        }
      } catch (error) {
        console.error('Error de red al obtener los rembolsos', error);
      }
    };

    const fetchEstados = async () => {
      try {
        const response = await fetch('http://localhost:8080/auto/get/estados',{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
        );
        if (response.ok) {
          const data = await response.json();
          setEstados(data);
        } else {
          console.error('Error al obtener rembolso');
        }
      } catch (error) {
        console.error('Error de red al obtener los rembolsos', error);
      }
    };

    fetchEstados();
    fetchRembolso();
    fetchCategoria();
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
    formData.append('categoria', tipoCategoria);
    formData.append('rembolso', tipoReembolso);
    formData.append('estado', estado);
    if (foto) formData.append('foto', foto);
    formData.append('sucursal', sucursalSeleccionada);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const token = localStorage.getItem('token');
      console.log(formData)
      const response = await fetch('http://localhost:8080/auto/actualizar', {
        method: 'PUT',
        body: formData,  // enviar directamente el FormData
        headers: {
          'Authorization': `Bearer ${token}` // solo el token, no Content-Type
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
    <>
      <button onClick={handleVolver}> volver </button>  
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
              <option value="">Seleccione un estado</option>
              {estados.map((e) => (
                <option key={e}>
                  {e}
                </option>
              ))}
            </select>
          </label>

          <label style={{ fontWeight: 'bold' }}>
            Categoria:
            <select
              value={tipoCategoria}
              onChange={(e) => setTipoCategoria(e.target.value)}
              required
              style={{ padding: 8, marginTop: 5, borderRadius: 4, border: '1px solid #ccc' }}
            >
              <option value="">Seleccione una categoria</option>
              {categorias.map((c) => (
                <option key={c}>
                  {c}
                </option>
              ))}
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
              <option value="SIN_REMBOLSO">SIN_REMBOLSO</option>
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
                <option key={s}>
                  {s}
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
    </>
  );
}

export default ActualizarVehiculo;