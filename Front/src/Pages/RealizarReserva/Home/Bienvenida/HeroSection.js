import React from "react";
import "./HeroSection.css";
import AlquilerForm from "./formulario";
import autoImage from "./static/auto.jpg"; // Asegurate de tener una imagen aquí

export default function HeroSection({sucursales, onSubmit }) {
  return (
    <div className="hero-section text-light position-relative"> {/* posición relativa para el contenedor */}
      <div className="container">
        {/* Parte superior: texto e imagen */}
        <div className="row align-items-center mb-5">
          {/* Texto */}
          <div className="col-md-6 text-start">
            <h1 className="display-4 fw-bold">
              Tu <span className="resaltado">tiempo</span> es <span className="resaltado">valioso</span>.
            </h1>
            <p className="lead">Alquilá un auto y hace que tus vacaciones duren mas</p>
          </div>
          {/* Imagen */}
          <div className="col-md-6 text-center">
            <img src={autoImage} alt="Auto" className="img-fluid auto-img" />
          </div>
        </div>

        {/* Formulario */}
        <div className="form-overlay-home">
            <AlquilerForm sucursales={sucursales} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}