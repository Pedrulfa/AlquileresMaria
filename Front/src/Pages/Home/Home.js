import React, { useState, useEffect } from "react";
import AlquilerForm from "./formulario";
import ListadoVehiculos from "./listado";

export default function Home() {

const [formData, setFormData] = useState(null);
const [autosDisponibles, setAutosDisponibles] = useState([]);

// Funcion para pedir a la api todos los autos del sistema
const cargarTodosAutos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/autos");
      if (!response.ok) throw new Error("Error al obtener autos");
      const autos = await response.json();
      setAutosDisponibles(autos);
    } catch (error) {
      console.error(error);
      alert("Error al cargar autos.");
    }
  };

// Cargar todos los autos al inicio, porque no hay formulario
useEffect(() => {
  cargarTodosAutos();
}, []);


// Esto deberia enviar los datos guardados en el formulario al bakcend y devuelve una lista con los autos disponibles (a chekear)
const handleFormSubmit = async (data) => {
  try {
    setFormData(data)
    const response = await fetch("http://localhost:8080/api/alquileres/disponibles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el formulario");
    }

    const autos = await response.json();
    setAutosDisponibles(autos);

  } catch (error) {
    console.error("Error al enviar:", error); //mensaje para chekear
    alert("Ocurrió un error al enviar el formulario ❌");
  }
};

  return (
    <div className="container-fluid bg-dark text-light py-4">
      <div> 
        <h1 className="text-center"> Bienvenido a Alquileres Maria</h1>
        </div>
      <div>
        <AlquilerForm onSubmit={handleFormSubmit} />
      </div>
      <div>         
        <ListadoVehiculos vehiculos={autosDisponibles} /> 
      </div>
    </div>
  );
}