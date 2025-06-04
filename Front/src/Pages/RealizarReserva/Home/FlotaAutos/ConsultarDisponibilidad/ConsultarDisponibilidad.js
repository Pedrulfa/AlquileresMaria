import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import AlquilerForm from '../../Bienvenida/formulario';

function ConsultarDisponibilidad() {
  const [disponible, setDisponible] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const auto = location.state?.auto;
  const sucursales = location.state?.sucursales;
  console.log(sucursales)
  console.count("Render ConsultarDisponibilidad");

  if (!auto) {
    return (
      <div className="container mt-4">
        <h2>No se seleccionó ningún auto</h2>
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </div>
    );
  }

  //esto debe devolver true si el auto esta disponible y false en caso contrario
  const verificarDisponibilidad = async (autoId, sucursalId, inicio, fin) => {
    setCargando(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/disponibilidad?autoId=${autoId}&sucursalId=${sucursalId}&inicio=${inicio}&fin=${fin}`
      );

      if (!response.ok) {
        throw new Error("Error al verificar disponibilidad");
      }

      const estaDisponible = await response.json();
      setDisponible(estaDisponible);
    } catch (error) {
      console.error("Error al consultar disponibilidad:", error);

      //cambiar a false, esta en true para probar
      setDisponible(true);
    }
    setCargando(false);
  };

  const handleAlquilerSubmit = (formulario) => {
    console.log("Formulario enviado:", formulario);

    const adaptado = {
    sucursalEntrega: formulario.sucursalEntrega,
    sucursalDevolucion: formulario.sucursalDevolucion,
    inicio: formulario.fechaInicio,
    fin: formulario.fechaFin,
    };
    setDatosFormulario(adaptado);

    verificarDisponibilidad(
      auto.id,
      adaptado.sucursalEntrega.id,
      adaptado.inicio,
      adaptado.fin
    );
  };

  

  const guardarAlquiler = () => {
    const datos = {
      ...datosFormulario,
      auto: auto
    };
    localStorage.setItem("alquiler", JSON.stringify(datos));
    console.log(datosFormulario)
    navigate("/seleccionar-conductor"); // O la siguiente vista de tu flujo
  };

  return (
    <>
      <div className="container mt-4">
        <h2>Consultar Disponibilidad</h2>

        <div className="card mb-4" style={{ maxWidth: '500px' }}>
          {auto.imagen && (
            <img
              src={auto.imagen}
              className="card-img-top"
              alt={`Imagen de ${auto.marca}`}
              style={{ height: '200px', objectFit: 'cover' }}
            />
          )}
          <div className="card-body">
            <h5 className="card-title">{auto.marca} - {auto.modelo}</h5>
            <p className="card-text"><strong>Categoría:</strong> {auto.categoria}</p>
            <p className="card-text"><strong>Capacidad:</strong> {auto.capacidad} personas</p>
            <p className="card-text"><strong>Precio:</strong> ${auto.precioPorDia}</p>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <h4>Ingrese los datos del alquiler:</h4>
        <AlquilerForm onSubmit={handleAlquilerSubmit} sucursales={sucursales} />

        {cargando && <p>Consultando disponibilidad...</p>}
        {disponible === true && (
          <div className="mt-3">
            <p className="text-success">✅ ¡El auto está disponible!</p>
            <Button variant="success" onClick={guardarAlquiler}>Empezar Alquiler</Button>
          </div>
        )}

        {disponible === false && (
          <p className="text-danger mt-3">❌ El auto no está disponible en ese período.</p>
        )}
      </div>
    </>
  );
}

export default ConsultarDisponibilidad;
