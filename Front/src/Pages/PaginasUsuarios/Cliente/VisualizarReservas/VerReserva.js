import React from "react"
import DatosAuto from "./DatosAuto.js"
import { Navigate, useNavigate } from "react-router-dom"

export default function VerReserva( {reserva}) {
    const auto = reserva.auto
    const fechas = reserva.rangoFecha
    const navigate = useNavigate()
    console.log(reserva)

    const handleCancelarReserva = async () => {
      const token = localStorage.getItem("token");
      console.log(token)
      const confirmacion = window.confirm("¿Estás seguro de que querés cancelar esta reserva?");
        if (!confirmacion) {
          return; // El usuario canceló la acción
        }
      try {
        const reservaCancelar = {
          fechaFin: fechas.fechaHasta,
          fechaDesde: fechas.fechaDesde,
          licencia: reserva.licenciaConductor
        };
        const response = await fetch("http://localhost:8080/alquiler/cancelarReserva", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(reservaCancelar),
        });

        if (!response.ok) {
          throw new Error("Error al cancelar la reserva");
        }

        const result = await response.json();
        console.log("Resultado de cancelación:", result); // debería ser true o false

        if (result === true) {
          alert("Reserva cancelada con éxito.");
        } else {
          alert("No se pudo cancelar la reserva.");
        }

      } catch (error) {
        console.error("Error al cancelar la reserva:", error);
        alert("Error al cancelar la reserva");
      }
    };

    return (
    <div className="card mb-3">
        <div className="card-body">
        <h3> ALQUILER </h3>
        <p className="card-text">
          <strong>Desde:</strong> {fechas.fechaDesde}<br />
          <strong>Hasta:</strong> {fechas.fechaHasta}<br />
          <strong>Conductor :</strong> {reserva.licenciaConductor}<br />
          <strong>Total:</strong> ${reserva.monto} <br />
          <strong>Estado del pago:</strong> {reserva.estadoPago}
          {reserva.estadoPago === "PENDIENTE" && (
            <button onClick={() => window.location.href = reserva.urlPago}>
            Pagar
            </button>
          )}
        </p>
        <h3> AUTO </h3>
        < DatosAuto auto={auto} />
      </div>
      <button onClick={handleCancelarReserva}>
          Cancelar reserva
      </button>
    </div>
  );
}