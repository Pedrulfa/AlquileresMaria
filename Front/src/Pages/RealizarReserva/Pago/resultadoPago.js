import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResultadoPago = () => {
  const [searchParams] = useSearchParams();
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const status = searchParams.get("status");
    const paymentId = searchParams.get("payment_id");

    setEstado(status);

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
    <div className="container mt-5">
      <h2>Resultado del Pago</h2>
      <p>{mensaje}</p>

      {/* Info extra del pago (opcional) */}
      {estado && (
        <div className="alert alert-info mt-4">
          <p><strong>Estado del pago:</strong> {estado}</p>
          <p><strong>ID del pago:</strong> {searchParams.get("payment_id")}</p>
        </div>
      )}
    </div>
  );
};

export default ResultadoPago;