import React, { useState } from "react";
import './formInicio.css';

const AlquilerForm = ({ onSubmit }) => {
  const [sucursalEntrega, setSucursalEntrega] = useState({ id: "", nombre: "" });
  const [sucursalDevolucion, setSucursalDevolucion] = useState({ id: "", nombre: "" });
  const [mostrarCiudadDevolucion, setMostrarCiudadDevolucion] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      sucursalEntrega,
      sucursalDevolucion: mostrarCiudadDevolucion ? sucursalDevolucion : sucursalEntrega,
      fechaInicio,
      fechaFin,
    });
  };

  const handleSucursalEntregaChange = (e) => {
    const id = e.target.value;
    const nombre = e.target.options[e.target.selectedIndex].text;
  setSucursalEntrega({ id, nombre });
  };

  const handleSucursalDevolucionChange = (e) => {
    const id = e.target.value;
    const nombre = e.target.options[e.target.selectedIndex].text;
    setSucursalDevolucion({ id, nombre });
  };

  return (
   <div className="d-flex justify-content-center form-center-inicio bg-dark">
        <div className="container" style={{ maxWidth: "1600px" }}>
            <div>
                <h1> Empieza tu nuevo alquiler</h1>
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-3 rounded shadow mb-4">
            <div className="row g-3 align-items-end">
                <div className="col-12 mb-2">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>{ 
                        if (mostrarCiudadDevolucion){
                            setSucursalDevolucion("");
                        }
                    setMostrarCiudadDevolucion(!mostrarCiudadDevolucion)
                    }}
                >
                    {mostrarCiudadDevolucion
                    ? "Ocultar sucursal de devolución"
                    : "Agregar sucursal de devolución"}
                </button>
                </div>

                {/* Ciudad de Recogida y Ciudad de Devolución con mismo ancho */}
               <div className={`col-md-${mostrarCiudadDevolucion ? 2 : 3}`}>
                    <label className="form-label fw-bold text-dark">Sucursal de Entrega</label>
                    <select
                        className="form-control input-grande"
                        value={sucursalEntrega.id}
                        onChange={handleSucursalEntregaChange}
                        required
                        >
                        <option value="">Seleccione una ciudad</option>
                        <option value="1">Montevideo</option>
                        <option value="2">Buenos Aires</option>
                        <option value="3">Santiago</option>
                        <option value="4">Lima</option>
                        </select>
                    </div>

                {mostrarCiudadDevolucion && (
                <div className="col-md-2">
                    <label className="form-label fw-bold text-dark">Sucursal de Devolución</label>
                    <select
                        className="form-control input-grande"
                        value={sucursalDevolucion.id}
                        onChange={handleSucursalDevolucionChange}
                        required
                        >
                        <option value="">Seleccione una ciudad</option>
                        <option value="1">Montevideo</option>
                        <option value="2">Buenos Aires</option>
                        <option value="3">Santiago</option>
                        <option value="4">Lima</option>
                        </select>
                </div>
                )}

                {/* Fecha de recogida */}
                <div className="col col-custom-1.5">
                <label className="form-label fw-bold text-dark">Fecha de Entrega</label>
                <input
                    type="date"
                    className="form-control input-grande"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    required
                />
                </div>
                {/* Fecha de devolución */}
                <div className="col col-custom-1.5">
                <label className="form-label fw-bold text-dark">Fecha de devolución</label>
                <input
                    type="date"
                    className="form-control input-grande"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    required
                />
                </div>
                {/* Botón Continuar */}
                <div className="col col-custom-1.5 d-flex align-items-end input-grande">
                    <button type="submit"
                            className="btn btn-danger fw-bold w-100 btn-lg-custom"
                            >
                        Continuar
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
  );
};

export default AlquilerForm;