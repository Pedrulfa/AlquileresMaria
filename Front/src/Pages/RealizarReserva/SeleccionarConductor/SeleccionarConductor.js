import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import DatosAlquiler from "../SeleccionarAuto/datosAlquiler";
import DatosAuto from "./DatosAuto";
import FormularioConductor from "./formularioConductor";
import "./SeleccionarConductor.css"
import React, { useState } from "react";
import { getUsuarioAutenticado } from "../../IniciarSesion/auth.js";

export default function SeleccionarConductor() {
    const [mostrarBoton, setMostrarBoton] = useState(false);
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
        setEmailValido(data); // true o false
    } catch (error) {
        console.error("Error al verificar el email:", error);
    }
    };
    */}

    //envia los datos del alquiler al backend y lo redirije a pagar a traves de mercado pago
    const chekPaymment = async () => {
      const payload = {
        datosPagoDTO: {
          titulo: "Reserva de Auto",
          successUrl: "http://localhost:3000/RealizarReserva/pago/resultadoPago",
          failureUrl: "http://localhost:3000/RealizarReserva/pago/resultadoPago",
          pendingUrl: "http://localhost:3000/RealizarReserva/pago/resultadoPago"
        },
        alquilerDTO: {
          rangoFecha: {
            fechaDesde: alquilerActual?.inicio,
            fechaHasta: alquilerActual?.fin
          },
          licenciaConductor: alquilerActual?.conductor,
          clienteMail: alquilerActual?.usuario.mail,
          patenteAuto: auto.patente,
          sucursalEntrega: alquilerActual?.sucursalEntrega,
          sucursalDevolucion: alquilerActual?.sucursalDevolucion
        }
      };

        try {
          const response = await fetch("http://localhost:8080/api/checkOut/registrarAlquiler", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });

          const redirectUrl = await response.text(); // Devuelve la URL del checkout

          // Redirige al usuario a Mercado Pago
          window.location.href = redirectUrl;

        } catch (error) {
          console.error("Error al registrar el alquiler:", error);
        }
      };

    console.log(alquilerActual)

    //chekea si hay un usuario con sesion iniciada sino lo manda a inicar sesion
    useEffect(() => {
      const usuario = getUsuarioAutenticado();

      //falta probar si cuando inicia sesion se lo redirije a "/seleccionar-conductor"
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

        {/* Mostrar botón o mensaje según validación */}
        {emailValido === true && (
          <button className="btn btn-primary mt-3" onClick={chekPaymment()}>Realizar Reseva</button>
        )}

        {emailValido === false && (
          <p className="text-danger mt-2">El conductor ya tiene un alquiler en esas fechas.</p>
        )}
      </div>
      

      {/* DERECHA: formulario */}
      <div className="derecha">
        <DatosAuto auto={auto} alquiler={alquilerActual} />
      </div>
    </div>
  );
}