import React from "react";

function QRPaymentDisplay() {
  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://tu-link-de-pago.com";

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-gray-900 rounded-xl text-center text-white">
      <h2 className="text-2xl font-bold mb-6">Paga escaneando este código QR</h2>

      <div className="inline-block bg-white p-4 rounded-lg mb-6">
        <img src={qrUrl} alt="Código QR para pagar" />
      </div>

      <p className="text-gray-300">Escanea con tu app de pagos para completar la transacción.</p>
    </div>
  );
}

export default QRPaymentDisplay;
