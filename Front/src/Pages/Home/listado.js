import React from "react";

const ListadoVehiculos = ({ vehiculos }) => {
  return (
    <div className="vehiculos-list">
      <h2 className="text-center mb-3">Listado de Vehículos</h2>
      {vehiculos.length === 0 ? (
        <p>Cargando vehículos... (No hay ninguno)</p>
      ) : (
        <ul className="list-group">
          {vehiculos.map((vehiculo) => (
            <li key={vehiculo.id} className="list-group-item">
              {vehiculo.modelo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListadoVehiculos;