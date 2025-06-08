import React, { useState } from "react";
import './formInicio.css';

const AlquilerForm = ({ sucursales, onSubmit }) => {
  const [sucursalEntrega, setSucursalEntrega] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false); // Estado checkbox

  const handleSubmit = (e) => {
    e.preventDefault();

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // ignorar la hora

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Validaciones
    if (fin <= inicio) {
      alert("La fecha de devolución debe ser posterior a la fecha de entrega.");
      return;
    }

    const diferenciaDias = (fin - inicio) / (1000 * 60 * 60 * 24);
    if (diferenciaDias > 15) {
      alert("El período de alquiler no puede ser mayor a 15 días.");
      return;
    }

    // Si todo está bien, continuar
    onSubmit({
      sucursalEntrega,
      fechaInicio,
      fechaFin,
    });
  };

  return (
    <div className="d-flex justify-content-center form-center-inicio">
      <div className="container" style={{ maxWidth: "1600px" }}>
        <form onSubmit={handleSubmit} className="bg-rojo-personalizado p-3 rounded shadow mb-4">
          <div className="row g-3 align-items-end">
            {/* Sucursal de Entrega */}
            <div className="col col-custom-1.5">
              <label className="form-label fw-bold text-light">Sucursal de Entrega</label>
              <select
                className="form-control input-compacto"
                value={sucursalEntrega}
                onChange={(e) => setSucursalEntrega(e.target.value)}
                required
              >
                <option value="">Seleccione una ciudad</option>
                {sucursales.map((sucursal, index) => (
                  <option key={index} value={sucursal}>
                    {sucursal}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha de recogida */}
            <div className="col col-custom-1.5">
              <label className="form-label fw-bold text-light">Fecha de Entrega</label>
              <input
                type="date"
                className="form-control input-compacto"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {/* Fecha de devolución */}
            <div className="col col-custom-1.5">
              <label className="form-label fw-bold text-light">Fecha de devolución</label>
              <input
                type="date"
                className="form-control input-compacto"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                required
              />
            </div>
            {/* Botón Continuar */}
            <div className="col col-custom-1.5 d-flex align-items-end input-compacto">
              <button
                type="submit"
                className="btn btn-dark fw-bold w-100 btn-lg-custom"
              >
                Continuar
              </button>
            </div>
                        {/* Checkbox para aceptar términos */}
            <div className="col-12">
              <label className="form-check-label text-light" style={{ userSelect: 'none' }}>
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                  required
                />
                soy mayor de 18 años
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlquilerForm;