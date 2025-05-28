import React, { useState } from "react";

function FormularioConductor( {onSubmit} ) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    foto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      foto: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear objeto conductor
    const conductor = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      foto: formData.foto,
    };

    // Enviarlo al padre
    onSubmit(conductor);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-5">
          <label>Nombre:</label>
          <input 
            type="text"
            name="nombre" 
            className="form-control"
            onChange={handleChange}
            required 
            />
        </div>
        <div className="col-md-5">
          <label>Apellido:</label>
          <input 
            type="text" 
            name="apellido"
            className="form-control"
            onChange={handleChange}
            required 
            />
        </div>
      </div>

      <div className="row">
        <div className="col-md-5">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            />
        </div>
        <div className="col-md-5">
          <label>Telefono:</label>
          <input
            type="tel"
            accept="telefono"
            onChange={handleChange}
            required
          />
        </div>
      </div>
       <div className="col-md-5">
        <label>Licencia de conducir:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>


      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormularioConductor;