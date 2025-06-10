import React from "react";
import "./filtrado.css"

function Filtrado({ filtro, setFiltro, onFiltrar, onDesfiltrar, auto}) {

  const minPrecio = 0;
  const maxPrecio = 10000;

  const precioMin = filtro.precioMin ?? minPrecio;
  const precioMax = filtro.precioMax ?? maxPrecio;

  const getMarcas = new Map();
    auto.forEach(a => {
      const aux = a.marca;
      getMarcas.set(aux, aux);
    })
  const marcasUnicas = Array.from(getMarcas.values());

  const getCapacidad = new Map();
    auto.forEach(a => {
      const aux = a.capacidad;
      getCapacidad.set(aux, aux);
    })
  const capacidadUnicas = Array.from(getCapacidad.values());

  const categoriaMap = new Map();
    auto.forEach(a => {
      const aux = a.categoria;
      categoriaMap.set(aux, aux);
    })
  const categoriaUnicas = Array.from(categoriaMap.values());


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
          <select
            className="form-select"
            value={filtro.marca}
            onChange={(e) => setFiltro({ ...filtro, marca: e.target.value })}
          >
            <option value="">Todas</option>
            {marcasUnicas.map((marca, index) => (
              <option key={index} value={marca}>{marca}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Capacidad</label>
          <select
            className="form-select"
            value={filtro.capacidad}
            onChange={(e) => setFiltro({ ...filtro, capacidad: e.target.value })}
          >
            <option value="">Todas</option>
            {capacidadUnicas.map((capacidad, index) => (
              <option key={index} value={capacidad}>{capacidad}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            value={filtro.categoria}
            onChange={(e) => setFiltro({ ...filtro, categoria: e.target.value })}
          >
            <option value="">Todas</option>
            {categoriaUnicas.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>
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
              step={100}
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