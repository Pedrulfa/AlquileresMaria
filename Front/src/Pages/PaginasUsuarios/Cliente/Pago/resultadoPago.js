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
      default:
        setMensaje("⏳ Tu pago está pendiente");
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
            localStorage.clear();
            window.location.href = "http://localhost:3000/";
            }}
            >
            Volver al inicio
        </button>
      </div>
    </>
  );
};

export default ResultadoPago;