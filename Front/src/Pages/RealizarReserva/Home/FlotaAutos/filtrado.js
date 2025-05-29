import React from "react";
import "./filtrado.css"

function Filtrado({ filtro, setFiltro, onFiltrar, onDesfiltrar }) {

  const minPrecio = 10000;
  const maxPrecio = 25000;

  const precioMin = filtro.precioMin ?? minPrecio;
  const precioMax = filtro.precioMax ?? maxPrecio;

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= precioMax) {
      setFiltro({ ...filtro, precioMin: value });
    }
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= precioMin) {
      setFiltro({ ...filtro, precioMax: value });
    }
  };

  return (
    <div className="container mt-4">
      <div className="row g-3 align-items-end">
        <div className="col-md-2">
          <label className="form-label">Marca</label>
          <input
            type="text"
            className="form-control"
            value={filtro.marca}
            onChange={(e) => setFiltro({ ...filtro, marca: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Capacidad</label>
          <input
            type="number"
            className="form-control"
            value={filtro.capacidad}
            onChange={(e) => setFiltro({ ...filtro, capacidad: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Categoría</label>
          <input
            type="text"
            className="form-control"
            value={filtro.categoria}
            onChange={(e) => setFiltro({ ...filtro, categoria: e.target.value })}
          />
        </div>
        <div className="col-md-4 ">
          <label className="form-label">
            Rango de precio: ${precioMin} - ${precioMax}
          </label>

          <div className="range-slider position-relative">
            <input
              type="range"
              min={minPrecio}
              max={maxPrecio}
              step={500}
              value={precioMin}
              onChange={handleMinChange}
              className="slider slider-min"
            />
            <input
              type="range"
              min={minPrecio}
              max={maxPrecio}
              step={500}
              value={precioMax}
              onChange={handleMaxChange}
              className="slider slider-max"
            />
          </div>
        </div>
        <div className="col-md-2">
            <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={onFiltrar}>
                Filtrar
                </button>
                <button className="btn btn-outline-light" onClick={onDesfiltrar}>
                Quitar filtros
                </button>
            </div>
          </div>
      </div> 
    </div>
  );
}

export default Filtrado;