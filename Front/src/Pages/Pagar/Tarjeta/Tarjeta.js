import React, { useState } from "react";

function PaymentForm() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      // Quitar todo lo que no sea número
      let cleaned = value.replace(/\D/g, "");
      // Limitar a 16 dígitos
      cleaned = cleaned.slice(0, 16);
      // Agregar espacios cada 4 dígitos
      const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
      setFormData({ ...formData, cardNumber: formatted });
    } else if (name === "expiry") {
      // Quitar todo lo que no sea número
      let cleaned = value.replace(/\D/g, "");
      // Limitar a 4 dígitos (MM + AA)
      cleaned = cleaned.slice(0, 4);
      // Agregar la barra después de 2 dígitos
      if (cleaned.length > 2) {
        cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
      }
      setFormData({ ...formData, expiry: cleaned });
    } else if (name === "cvv") {
      // Quitar todo lo que no sea número
      let cleaned = value.replace(/\D/g, "");
      // Limitar a 4 dígitos máximo
      cleaned = cleaned.slice(0, 4);
      setFormData({ ...formData, cvv: cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isValidCardNumber = (number) => {
    const cleaned = number.replace(/\s+/g, "");
    return /^\d{16}$/.test(cleaned);
  };

  const isValidExpiry = (expiry) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      return false;
    }

    const [monthStr, yearStr] = expiry.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year > currentYear) return true;
    if (year === currentYear && month >= currentMonth) return true;

    return false;
  };

  const isValidCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidCardNumber(formData.cardNumber)) {
      alert("El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    if (!isValidExpiry(formData.expiry)) {
      alert("La fecha de vencimiento no es válida. Use el formato MM/AA.");
      return;
    }

    if (!isValidCVV(formData.cvv)) {
      alert("El CVV debe tener 3 o 4 dígitos.");
      return;
    }

    console.log("Datos enviados:", formData);
    alert("Pago procesado (simulado)");
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Pago con tarjeta</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "bold",
          }}
        >
          Nombre del titular:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ej: Juan Pérez"
            style={{
              padding: 8,
              marginTop: 5,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "bold",
          }}
        >
          Número de tarjeta:
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            maxLength={19} // 16 dígitos + 3 espacios
            placeholder="1234 5678 9012 3456"
            style={{
              padding: 8,
              marginTop: 5,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </label>

        <div
          style={{ display: "flex", gap: "20px", marginBottom: 10 }}
        >
          <label
            style={{
              flex: 1,
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
            }}
          >
            Vencimiento:
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              required
              maxLength={5} // MM/AA
              placeholder="MM/AA"
              style={{
                padding: 8,
                marginTop: 5,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label
            style={{
              flex: 1,
              fontWeight: "bold",
              display: "flex",
              flexDirection: "column",
            }}
          >
            CVV:
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
              maxLength={4}
              placeholder="123"
              style={{
                padding: 8,
                marginTop: 5,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: 10,
            borderRadius: 4,
            backgroundColor: "#2e8b57",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Confirmar pago
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
