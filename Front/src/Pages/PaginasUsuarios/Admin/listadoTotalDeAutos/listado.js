import './listado.css';
import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function VehiculosDisponibles({ vehiculos, onSubmit }) {
  const [autoModal, setAutoModal] = useState(null);
  const [mostrarMenu, setMostrarMenu] = useState(null);
  const [vistaActual, setVistaActual] = useState('inicio');
  const navigate = useNavigate();

  const handleVolver = () =>{
    navigate("/admin");
  }
  const cambiarVista = (vista) => {
    setVistaActual(vista);
    setMostrarMenu(null);
  };

  const eliminar = async (patente) => {
      const confirmado = window.confirm(`¿Eliminar el vehículo con patente ${patente}?`);
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
          throw new Error(`Error al eliminar: ${errorText}`);
        }

        alert("Vehículo eliminado correctamente.");

        if (onSubmit) onSubmit(patente);  // Notifico al padre para que actualice la lista

      } catch (error) {
        console.error(error);
        alert("Hubo un error al eliminar el vehículo.");
      }
    };

    const actualizar = async (auto) => {
      navigate('/actualizarAuto')
    };

  return (
    <>
    <button onClick={handleVolver}> volver </button>  
      <div className="vehiculos-grid">
        {vehiculos.map((auto) => (
       <div key={auto.patente} className="vehiculo-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {auto.imagen ? (
            <img src={auto.imagen} alt="Vehículo" className="vehiculo-img" />
            ) : (
            <div className="vehiculo-img sin-imagen">Sin imagen</div>
            )}

            <div style={{ position: 'relative', marginLeft: '10px' }}>
            <button
                className="btn btn-seleccionar"
                onClick={(e) => {
                e.stopPropagation();
                setMostrarMenu(auto.patente === mostrarMenu ? null : auto.patente);
                }}
            >
                Opciones▾
            </button>

            {mostrarMenu === auto.patente && (
              <div style={estilosMenu}>
                <button onClick={() => actualizar(auto)} style={botonMenu}>➕ Actualizar datos</button>
                <button onClick={() => eliminar(auto.patente)} style={{ ...botonMenu, color: '#ff4d4d' }}>⛔ Eliminar</button>
              </div>
            )}
            </div>
        </div>

        <div className="vehiculo-body">
            <h5>{auto.marca}</h5>
            <p>Categoría: {auto.categoria}</p>
            <p>Capacidad: {auto.capacidad} personas</p>
            <p className="card-text mb-0">Precio: ${auto.precio} / día</p>
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
            {autoModal.imagen && (
              <img
                src={autoModal.imagen}
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
        </Modal>
      )}
    </>
  );
}

// Estilos
const botonMenu = {
  padding: '12px 20px',
  width: '100%',
  background: 'transparent',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  color: 'white',
  fontWeight: 'bold',
  borderBottom: '1px solid #333',
  fontSize: '14px',
};

const estilosMenu = {
  position: 'absolute',
  top: '100%',
  right: 0,
  marginTop: 5,
  backgroundColor: '#1c1c1c',
  border: '1px solid #b22222',
  borderRadius: 6,
  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  zIndex: 9999,
  minWidth: 200
};

export default VehiculosDisponibles;