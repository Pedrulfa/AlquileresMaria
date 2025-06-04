import './listadoInicio.css'
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

function ListadoVehiculos({ vehiculos }) {
  const [autoSeleccionado, setAutoSeleccionado] = useState(null);
  const navigate = useNavigate();  // Hook para navegar
  if (!vehiculos || vehiculos.length === 0) return <p>No hay vehículos disponibles.</p>;

  // Función para dividir el array en grupos de 3
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const grupos = chunkArray(vehiculos, 3);

  const handleCardClick = (auto) => {
    setAutoSeleccionado(auto);
  };

  const cerrarModal = () => {
    setAutoSeleccionado(null);
  };

  const sucursalesMap = new Map();
    vehiculos.forEach(vehiculo => {
      const sucursal = vehiculo.sucursal;
      sucursalesMap.set(sucursal, sucursal); // clave y valor son el nombre
    });


  const sucursalesUnicas = Array.from(sucursalesMap.values());

  const consultarAuto = () => {
      if (autoSeleccionado) {
        // Redirige a /consultar-disponibilidad y pasa el auto seleccionado en state
        navigate('/consultar-disponibilidad', { state: { auto: autoSeleccionado, sucursales : sucursalesUnicas } });
      }
  };

  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        {/* Slides */}
        <div className="carousel-inner">
          {grupos.map((grupo, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <div className="d-flex justify-content-around ">
                {grupo.map((auto) => (
                  <div
                    key={auto.id}
                    className="card"
                      style={{
                            width: "30%",     // Más ancha que antes (de 19% a 22%)
                            minWidth: "200px",
                            minHeight: "500px", // Más alta que antes
                            fontSize: "2rem",   // Aumenta el tamaño base del texto
                            cursor: 'pointer',
                          }}onClick={() => handleCardClick(auto)}
                  >
                    {auto.imagen ? (
                      <img
                        src={auto.imagen}
                        className="card-img-top"
                        alt={`Imagen de ${auto.marca}`}
                        style={{
                          height: "300px",
                          objectFit: "cover", // para que no se deforme
                          borderTopLeftRadius: "0.75rem",  // igual que el border-radius de la card
                          borderTopRightRadius: "0.75rem",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: "300px",
                          backgroundColor: "#ccc",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#666",
                        }}
                      >
                        Sin imagen disponible
                      </div>
                    )}
                    <div className="card-body p-4">
                      <h5 className="card-title mb-4 fs-2">
                        {auto.marca} - {auto.modelo}
                      </h5>
                      <p className="card-text mb-2 fs-6 fs-5">
                        Categoría: {auto.categoria}
                      </p>
                      <p className="card-text mb-2 fs-6 fs-5" >
                        Capacidad: {auto.capacidad} personas
                      </p>
                      <p className="card-text mb-2 fs-6 fs-5">
                        Precio: ${auto.precioPorDia}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Controles */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

    {autoSeleccionado && (
      <Modal show={true} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>{autoSeleccionado.marca} - {autoSeleccionado.patente}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {autoSeleccionado.imagen && (
            <img
              src={autoSeleccionado.imagen}
              alt="Imagen del auto"
              style={{ width: "100%", height: "200px", objectFit: "cover", marginBottom: "1rem" }}
            />
          )}
          <p><strong>Categoría:</strong> {autoSeleccionado.categoria}</p>
          <p><strong>Capacidad:</strong> {autoSeleccionado.capacidad} personas</p>
          <p><strong>Precio:</strong> ${autoSeleccionado.precio}</p>
          <p><strong>Descripción:</strong> {autoSeleccionado.descripcion || "No disponible"}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={consultarAuto}>
            Consultar Disponibilidad
          </Button>
        </Modal.Footer>
      </Modal>
    )}
    </>
  );
}


export default ListadoVehiculos;