import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import './listado.css';  // Puedes crear estilos parecidos para sucursales

function SucursalesDisponibles({ sucursales, onSelect }) {
  const [sucursalModal, setSucursalModal] = useState(null);

  return (
    <>
      <div className="sucursales-grid">
        {sucursales.map((sucursal) => (
          <div key={sucursal.id} className="sucursal-card">
            {sucursal.imagen ? (
              <img src={sucursal.imagen} alt="Sucursal" className="sucursal-img" />
            ) : (
              <div className="sucursal-img sin-imagen">Sin imagen</div>
            )}
            <div className="sucursal-body">
              <p>Localidad: {sucursal.localidad}</p>
              <p>Dirección: {sucursal.direccion}</p>
              <p>Teléfono: {sucursal.telefono}</p>
              <div className="boton-seleccionar-container">
                <button
                  className="btn btn-seleccionar"
                  onClick={() => onSelect(sucursal, "/vehiculos")}
                >
                  Vehiculos
                </button>
                <button
                  className="btn btn-seleccionar"
                  onClick={() => onSelect(sucursal, "/empleados")}
                >
                  Empleados
                </button>
                <button
                  className="btn btn-seleccionar"
                  onClick={() => onSelect(sucursal, "/estadisticas")}
                >
                  Estadisticas
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sucursalModal && (
        <Modal show={true} onHide={() => setSucursalModal(null)}>
          <Modal.Header closeButton>
            <Modal.Title>{sucursalModal.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {sucursalModal.imagen && (
              <img
                src={sucursalModal.imagen}
                alt="Imagen de la sucursal"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "1rem",
                }}
              />
            )}
            <p><strong>Localidad:</strong> {sucursalModal.localidad}</p>
            <p><strong>Dirección:</strong> {sucursalModal.direccion}</p>
            <p><strong>Teléfono:</strong> {sucursalModal.telefono}</p>
            <p><strong>Descripción:</strong> {sucursalModal.descripcion || "No disponible"}</p>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default SucursalesDisponibles;