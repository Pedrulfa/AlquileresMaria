import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ActualizarVehiculo() {
  const { state } = useLocation();
  const auto = state?.auto;
  const sucursal = auto?.sucursal;
  const navigate = useNavigate();

  const [precioPorDia, setPrecioPorDia] = useState(auto?.precioPorDia || '');
  const [estado, setEstado] = useState(auto?.estado || '');
  const [tipoReembolso, setTipoReembolso] = useState(auto?.rembolso || '');
  const [tipoCategoria, setTipoCategoria] = useState(auto?.categoria || '');
  const [fotoUrl, setFotoUrl] = useState(
  auto?.endpointImagen ? `http://localhost:8080${auto.endpointImagen}` : null
);
  const [fotoFile, setFotoFile] = useState(null); // para enviar si se reemplaza
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(auto?.sucursal || '');
  const [sucursales, setSucursales] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [rembolso, setRembolso] = useState([]);
  const [estados, setEstados] = useState([]);
  const token = localStorage.getItem("token");

  const handleVolver = () => {
    navigate("/Admin/listadoTotalDeAutos/VisualizarAuto.js", { state: { sucursal } });
  };

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      try {
        const [resSuc, resCat, resRem, resEst] = await Promise.all([
          fetch('http://localhost:8080/admin/sucursal/listar', { headers }),
          fetch('http://localhost:8080/auto/get/categorias', { headers }),
          fetch('http://localhost:8080/auto/get/rembolsos', { headers }),
          fetch('http://localhost:8080/auto/get/estados', { headers }),
        ]);

        if (resSuc.ok) setSucursales(await resSuc.json());
        if (resCat.ok) setCategorias(await resCat.json());
        if (resRem.ok) setRembolso(await resRem.json());
        if (resEst.ok) setEstados(await resEst.json());

      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [token]);

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
    formData.append('patente', auto.patente);
    formData.append('precioPorDia', precioPorDia);
    formData.append('categoria', tipoCategoria);
    formData.append('rembolso', tipoReembolso);
    formData.append('estado', estado);
    formData.append('sucursal', sucursalSeleccionada);
    if (fotoFile) {
      formData.append('imagen', fotoFile);
    }

    try {
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
    <>
      <button onClick={handleVolver}>Volver</button>
      <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Actualizar Vehículo</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

          <label>
            Precio por día:
            <input
                  type="number"
                  value={precioPorDia}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value < 0) {
                      alert("El precio no puede ser negativo");
                      return; // no actualiza el estado si es negativo
                    }
                    setPrecioPorDia(value);
                  }}
                  step="1"
                />
          </label>

          <label>
            Estado:
            <select value={estado} onChange={(e) => setEstado(e.target.value)} required>
              <option value="">Seleccione un estado</option>
              {estados.map(e => <option key={e}>{e}</option>)}
            </select>
          </label>

          <label>
            Categoría:
            <select value={tipoCategoria} onChange={(e) => setTipoCategoria(e.target.value)} required>
              <option value="">Seleccione una categoría</option>
              {categorias.map(c => <option key={c}>{c}</option>)}
            </select>
          </label>

          <label>
            Tipo de reembolso:
            <select value={tipoReembolso} onChange={(e) => setTipoReembolso(e.target.value)} required>
              <option value="">Seleccione tipo de reembolso</option>
              {rembolso.map(r => <option key={r}>{r}</option>)}
            </select>
          </label>

          <label>
            Foto del vehículo (opcional):
            <div>
              {fotoUrl && (
                <>
                  <img src={fotoUrl} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: 200 }} />
                </>
              )}
            </div>
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFotoFile(file);
                setFotoUrl(URL.createObjectURL(file));
              }
            }} />
          </label>

          <label>
            Sucursal:
            <select value={sucursalSeleccionada} onChange={(e) => setSucursalSeleccionada(e.target.value)} required>
              <option value="">Seleccione una sucursal</option>
              {sucursales.map(s => <option key={s}>{s}</option>)}
            </select>
          </label>

          <button type="submit" style={{ padding: 10, backgroundColor: '#b22222', color: 'white', border: 'none', borderRadius: 4 }}>Confirmar Actualización</button>
        </form>
      </div>
    </>
  );
}

export default ActualizarVehiculo;