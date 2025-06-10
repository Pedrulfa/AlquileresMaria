import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResultadoPago = () => {
  const [searchParams] = useSearchParams();
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const status = searchParams.get("status");
    const paymentId = searchParams.get("payment_id");

    if (!status || status === "null" || !paymentId || paymentId === "null") {
      setMensaje("⏳ Tu pago está pendiente");
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
            window.location.href = "http://localhost:3000/cliente?collection_id=null&collection_status=null&payment_id=null&status=null&external_reference=13&payment_type=null&merchant_order_id=null&preference_id=2454892997-c15682fb-b006-4118-bf59-e96c185cb7ac&site_id=MLA&processing_mode=aggregator&merchant_account_id=null";
            }}
            >
            Volver al inicio
        </button>
      </div>
    </>
  );
};

export default ResultadoPago;