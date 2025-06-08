import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResultadoPago = () => {
  const [searchParams] = useSearchParams();
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const status = searchParams.get("status");
    const paymentId = searchParams.get("payment_id");

    if (!status || status === "null" || !paymentId || paymentId === "null") {
      const status = "pending"
      setMensaje("⏳ Tu pago está pendiente. Tendras una semana para completar el pago.");
      return;
    }
    switch (status) {
      case "approved":
        setMensaje("✅ ¡Tu pago fue aprobado con éxito!");
        break;
      case "pending":
        setMensaje("⏳ Tu pago está pendiente. Te notificaremos cuando se confirme.");
        break;
      case "failure":
        setMensaje("❌ Ocurrió un error con tu pago. Por favor, intenta nuevamente.");
        break;
      default:
        setMensaje("❓ No se pudo determinar el estado del pago.");
    }
  }, [searchParams]);

  return (
    <>
      <div className="container mt-5">
        <h2>Resultado del Pago</h2>
        <p>{mensaje}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            window.location.href = "/cliente";
            }}
            >
            Volver al inicio
        </button>
        <button
          className="btn btn-primary mt-3"
          onClick={() => {
            window.location.href = "/cliente";
            }}
            >
            Ver reservas
        </button>
      </div>
    </>
  );
};

export default ResultadoPago;