import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import DatosAuto from "./DatosAuto";
import FormularioConductor from "./formularioConductor";
import "./SeleccionarConductor.css"
import React, { useState } from "react";
import { getUsuarioAutenticado } from "../../IniciarSesion/auth.js";

export default function SeleccionarConductor() {
    const [alquilerActual, setAlquilerActual] = useState(() => {
    const stored = localStorage.getItem("alquiler");
    return stored ? JSON.parse(stored) : null;
    });
    const [enviando,setEnviando] = useState(false);
    const auto = alquilerActual?.auto;
    const navigate = useNavigate();
    //console.log(alquilerActual)
    const token = localStorage.getItem("token")
    console.log(token)


    //envia los datos del alquiler al backend y lo redirije a pagar a traves de mercado pago
    const chekPaymment = async (alquiler) => {
        if (enviando) return; // ✋ evitar doble envío
          setEnviando(true);
      console.log("🚀 Enviando alquiler al backend:", alquiler);
      const payload = {
        datosPagoDTO: {
          titulo: "Reserva de Auto",
          successUrl: "https://localhost:3000/RealizarReserva/pago/resultadoPago",
          failureUrl: "https://localhost:3000/RealizarReserva/pago/resultadoPago",
          pendingUrl: "https://localhost:3000/RealizarReserva/pago/resultadoPago"
        },
        alquilerDTO: {
          rangoFecha: {
            fechaDesde: alquiler?.inicio,
            fechaHasta: alquiler?.fin
          },
          licenciaConductor: alquiler?.conductor,
          patenteAuto: alquiler?.auto?.patente,
          sucursal: alquiler?.sucursalEntrega,
        }
      };
      try {
        console.log("Payload:", JSON.stringify(payload, null, 2));
        const response = await fetch("http://localhost:8080/checkOut/cliente/registrarAlquiler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error del servidor:", errorText);
          return; // ❌ no redirijas si hubo error
        }

        const redirectUrl = await response.text();
        window.location.href = redirectUrl;

      } catch (error) {
        console.error("Error de red/fetch:", error);
      }
    }


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
            alquiler.usuario = usuario?.sub;
            localStorage.setItem("alquiler", JSON.stringify(alquiler));
            setAlquilerActual(alquiler);
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
      return diffMs / (1000 * 60 * 60 * 24);
    };

    const calcularPrecio = () => {
      const dias = calcularDias();
      return dias * alquilerActual?.auto?.precioPorDia;
    };

    const dias = calcularDias();
    const precioTotal = calcularPrecio();

  const handleFormSubmit = (conductor) => {
    console.log("🟢 handleFormSubmit ejecutado con:", conductor);
    
    const updatedAlquiler = {
      ...alquilerActual,
      conductor: conductor.dni,
      dias: calcularDias(),
      precio: calcularPrecio()
    };

    console.log("📦 Alquiler actualizado:", updatedAlquiler);

    setAlquilerActual(updatedAlquiler);
    localStorage.setItem("alquiler", JSON.stringify(updatedAlquiler));

    chekPaymment(updatedAlquiler);
  };

    return (
    <div className="contenedor-flex">
      {/* IZQUIERDA: datos del auto */}
      <div className="izquierda form-card">
        <h1>Datos del conductor</h1>
        <FormularioConductor onSubmit={handleFormSubmit} /> 
      </div>
      

      {/* DERECHA: formulario */}
      <div className="derecha">
        <DatosAuto auto={auto} alquiler={alquilerActual} dias={dias} precioTotal={precioTotal} />
      </div>
    </div>
  );
}