import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import DatosAlquiler from "../SeleccionarAuto/datosAlquiler";
import DatosAuto from "./DatosAuto";
import FormularioConductor from "./formularioConductor";
import "./SeleccionarConductor.css"
import React, { useState } from "react";
import { getUsuarioAutenticado } from "../../IniciarSesion/auth.js";

export default function SeleccionarConductor() {
    const [emailValido, setEmailValido] = useState(null);
    const alquilerActual = JSON.parse(localStorage.getItem("alquiler"));
    const auto = alquilerActual?.auto;
    const navigate = useNavigate();

    {/* llamada a la api para verificar si el conductor tiene algun alquiler en las fechas
    const verificarConductor = async (email) => {
    try {
        const Inicio = alquilerActual?.inicio
        const final = alquilerActual?.fin
        const response = await fetch(`http://localhost:8080/api/verificar-email?email=${email}&inicio=${Inicio}&final=${final}`);
        const data = await response.json();
        setEmailValido(data.existe); // true o false
    } catch (error) {
        console.error("Error al verificar el email:", error);
    }
    };
    */}

    console.log(alquilerActual)

    //chekea si hay un usuario con sesion iniciada
    useEffect(() => {
      const usuario = getUsuarioAutenticado();

      if (!usuario) {
        localStorage.setItem("redirectAfterLogin", "/seleccionar-conductor");
        navigate('/iniciar-sesion');
      } else {
        const alquilerStr = localStorage.getItem("alquiler");
        if (alquilerStr) {
          try {
            const alquiler = JSON.parse(alquilerStr);
            alquiler.usuario = usuario;
            localStorage.setItem("alquiler", JSON.stringify(alquiler));
          } catch (err) {
            console.error("Error al parsear alquiler", err);
          }
        }
      }
    }, [navigate]);

    const calcularDias = () => {
        if (!alquilerActual?.inicio || !alquilerActual?.fin) return 0;
        const inicio = new Date(alquilerActual.inicio);
        const fin = new Date(alquilerActual.fin);
        const diffMs = fin - inicio;
        const diffDias = diffMs / (1000 * 60 * 60 * 24);
        return diffDias;
  };

    const calcularPrecio = () => {
        const dias = alquilerActual?.dias
        const precio = dias * alquilerActual?.auto.precioPorDia
        return precio;
    }

    alquilerActual.dias = calcularDias();
    alquilerActual.precio = calcularPrecio();

    const handleFormSubmit = (conductor) => {
        //verificarConductor(conductor.email);
        alquilerActual.conductor = conductor
        console.log(alquilerActual)
    }
    return (
    <div className="contenedor-flex">
      {/* IZQUIERDA: datos del auto */}
      <div className="izquierda form-card">
        <h1>Datos del conductor</h1>
        <FormularioConductor onSubmit={handleFormSubmit} />
      </div>

      {/* DERECHA: formulario */}
      <div className="derecha">
        <DatosAuto auto={auto} alquiler={alquilerActual} />
      </div>
    </div>
  );
}