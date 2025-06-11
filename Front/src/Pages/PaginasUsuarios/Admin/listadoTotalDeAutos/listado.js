import './listado.css';
import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function VehiculosDisponibles({ vehiculos, onSubmit }) {
  const [autoModal, setAutoModal] = useState(null);
  const [mostrarMenu, setMostrarMenu] = useState(null);
  const [vistaActual, setVistaActual] = useState('inicio');
  const navigate = useNavigate();
  if (!vehiculos || vehiculos.length === 0) return <p>No hay vehículos disponibles.</p>;

  const eliminar = async (patente) => {
      const confirmado = window.confirm(`¿Eliminar el vehículo con patente ${patente}?`);
      console.log(patente)
      if (!confirmado) return;

      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:8080/auto/eliminar?patente=${encodeURIComponent(patente)}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        alert("Vehículo eliminado correctamente.");
        window.location.reload();

        if (onSubmit) onSubmit(patente);  

      } catch (error) {
        alert(error);
      }
    };

  return (
    <>
      <div className="vehiculos-grid">
        {vehiculos.map((auto) => (
       <div key={auto.patente} className="vehiculo-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {auto.endpointImagen ? (
            <img src={`http://localhost:8080/auto/get/imagen?patente=${auto.patente}`} alt="Vehículo" className="vehiculo-img" />
            ) : (
            <div className="vehiculo-img sin-imagen">Sin imagen</div>
            )}
        </div>

        <div className="vehiculo-body">
            <h5>{auto.marca} - {auto.patente}</h5>
            <p>Categoría: {auto.categoria}</p>
            <p>Capacidad: {auto.capacidad} personas</p>
            <p className="card-text mb-0">Precio: ${auto.precioPorDia} / día</p>
            <div style={{ position: 'relative', marginLeft: '10px' }}>
            <button
                className="btn btn-seleccionar"
                onClick={() => {
                  navigate("ActualizarVehiculo", { state: {auto}} )
                }}
            >
                Actualizar
            </button>
            <button
              type="button"
              className="btn btn-seleccionar"
              onClick={() => eliminar(auto.patente)}
            >
              Eliminar
            </button>
            </div>
        </div>
        </div>
        ))}
      </div>
    </>
  );
}

export default VehiculosDisponibles;