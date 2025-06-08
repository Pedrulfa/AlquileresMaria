import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import './listado.css';  // Puedes crear estilos parecidos para sucursales
import { useNavigate } from "react-router-dom";

function SucursalesDisponibles({ sucursales, onSelect }) {
  const [sucursalModal, setSucursalModal] = useState(null);
  const navigate = useNavigate();


  const handleClick = (ruta , sucursal) => {
    navigate(ruta, { state: { sucursal } });
  };

  return (
    <>
      <div className="sucursales-grid">
        {sucursales.map((sucursal) => (
          <div key={sucursal} className="sucursal-card">
            <div className="sucursal-body">
              <p>Localidad: {sucursal}</p>
              <div className="boton-seleccionar-container">
                <button
                  className="btn btn-seleccionar"
                  onClick={() =>
                    handleClick(`/Admin/listadoTotalDeAutos/VisualizarAuto.js`, sucursal)
                  }
                >
                  Vehiculos
                </button>
                <button
                  className="btn btn-seleccionar"
                  //sin hacer no lo pide
                  onClick={() => handleClick("/Admin/listadoTotalDeAutos/VisualizarEmpleado.js" , sucursal)}
                >
                  Empleados
                </button>
                <button
                  className="btn btn-seleccionar"
                  //sin hacer
                  onClick={() => handleClick("/Admin/listadoTotalDeAutos/VisualizarEstadistica.js" , sucursal)}
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