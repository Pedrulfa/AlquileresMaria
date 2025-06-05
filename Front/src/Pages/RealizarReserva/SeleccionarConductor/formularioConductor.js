import React, { useState } from "react";

function FormularioConductor({ onSubmit }) {
  const [formData, setFormData] = useState({
    dni: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    const conductor = {
      dni: formData.dni,
    };

    onSubmit(conductor);
  };
  console.log("🧩 FormularioConductor renderizado");

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-5">
          <label>DNI:</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormularioConductor;