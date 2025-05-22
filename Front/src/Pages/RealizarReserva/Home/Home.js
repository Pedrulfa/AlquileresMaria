import React, { useState, useEffect } from "react";
import AlquilerForm from "./formulario";
import ListadoVehiculos from "./listado";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {

const [formData, setFormData] = useState(null);
const [autos, setAutos] = useState([]);

// Funcion para pedir a la api todos los autos del sistema
const cargarTodosAutos = async () => {
    try {
      const response = await fetch("http://localhost:8080/autos/listar");
      if (!response.ok) throw new Error("Error al obtener autos");
      const autos = await response.json();
      setAutos(autos);
    } catch (error) {
      console.error(error);
      alert("Error al cargar autos.");
    }
  };

// Cargar todos los autos al inicio, porque no hay formulario
useEffect(() => {
  cargarTodosAutos();
}, []);

const handleFormSubmit = (data) => {
    const datosIniciales = {
    inicio: data.fechaInicio,
    fin: data.fechaFin,
    sucursalEntrega: data.sucursalEntrega,
    sucursalDevolucion: data.sucursalDevolucion,
  };

  localStorage.setItem("alquiler", JSON.stringify(datosIniciales));

  window.location.href = "/seleccionar-auto";
};


  return (
    <div className="container-fluid bg-dark text-light py-4">
      <div> 
        <h1 className="text-center"> Bienvenido a Alquileres Maria</h1>
        </div>
      <div className="container-fluid bg-dark text-light py-4">
        <AlquilerForm onSubmit={handleFormSubmit} />
      </div>
      <div className="container mt-4">        
        <ListadoVehiculos vehiculos={autos} /> 
      </div>
    </div>
  );
}