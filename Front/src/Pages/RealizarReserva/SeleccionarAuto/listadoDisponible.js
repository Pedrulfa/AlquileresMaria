import './listadoDisponible.css';
import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";

function VehiculosDisponibles({ vehiculos, onSubmit }) {
    const [autoSeleccionado, setAutoSeleccionado] = useState(null);
    const [autoModal, setAutoModal] = useState(null);
    return (
        <>
        <h1 className="titulo">Selecciona un Auto</h1>
        <div className="vehiculos-grid">
            {vehiculos.map((auto) => (
            <div key={auto.id} 
                className="vehiculo-card"
                onClick={() => setAutoModal(auto)}
                style={{ cursor: 'pointer' }}>
                {auto.endpointImagen ? (
                <img src={`http://localhost:8080/auto/get/imagen?patente=${auto.patente}`} alt="Vehículo" className="vehiculo-img" />
                ) : (
                <div className="vehiculo-img sin-imagen">Sin imagen</div>
                )}
                <div className="vehiculo-body">
                    <h5>{auto.marca}</h5>
                    <p>Categoría: {auto.categoria}</p>
                    <p>Capacidad: {auto.capacidad} personas</p>
                    <div className="precio-boton">
                        <p className="card-text mb-0">Precio: ${auto.precioPorDia} / dia</p>
                        <button
                            className="btn btn-seleccionar"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSubmit(auto); // esto le pasa el auto al padre
                            }}
                            >
                            Seleccionar
                        </button>
                    </div>
                </div>
            </div>
            ))}
        </div>
        {autoModal && (
            <Modal show={true} onHide={() => setAutoModal(null)}>
                <Modal.Header closeButton>
                <Modal.Title>{autoModal.marca} - {autoModal.patente}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {autoModal.endpointImagen && (
                    <img
                    src={`http://localhost:8080/auto/get/imagen?patente=${autoModal.patente}`}
                    alt="Imagen del auto"
                    style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        marginBottom: "1rem"
                    }}
                    />
                )}
                <p><strong>Categoría:</strong> {autoModal.categoria}</p>
                <p><strong>Capacidad:</strong> {autoModal.capacidad} personas</p>
                <p><strong>Precio:</strong> ${autoModal.precio}</p>
                <p><strong>Descripción:</strong> {autoModal.descripcion || "No disponible"}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setAutoModal(null)}>
                    Cerrar
                </Button>
                </Modal.Footer>
            </Modal>
            )}
        </>
    );
}

export default VehiculosDisponibles;