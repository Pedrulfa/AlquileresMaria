import React from "react"
import DatosAuto from "./DatosAuto.js"
import { Navigate, useNavigate } from "react-router-dom"

export default function VerReserva( {reserva}) {
    const auto = reserva.auto
    const fechas = reserva.rangoFecha
    const navigate = useNavigate()

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
    </div>
  );
}