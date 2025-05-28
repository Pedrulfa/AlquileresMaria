// Esto deberia enviar los datos guardados en el formulario al bakcend y devuelve una lista con los autos disponibles (a chekear)
import VehiculosDisponibles from "./listadoDisponible"
import DatosAlquiler from "./datosAlquiler"

import React, { useEffect, useState } from "react";

export default function SeleccionarAuto() {

const [autosDisponibles, setAutosDisponibles] = useState([]);
const [formData, setFormData] = useState({});

const FiltrarAutos = async () => {
  try {
    const storedData = localStorage.getItem("alquiler");
    if (!storedData) {
      throw new Error("No hay datos en el localStorage");
    }

    const data = JSON.parse(storedData); // 👈 Parseás el string a objeto

    setFormData(data); // Si esto lo necesitas para mostrar en la UI

    const response = await fetch("http://localhost:8080/alquileres/disponibles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // 👈 ahora esto es un objeto JS convertido a JSON válido
    });

    if (!response.ok) {
      throw new Error("Error al enviar el formulario");
    }

    const autos = await response.json();
    setAutosDisponibles(autos);
  } catch (error) {
    console.error("Error al enviar:", error);
    alert("Ocurrió un error al enviar el formulario ❌");
  }
};

// Cargar todos los autos al inicio, porque no hay formulario
useEffect(() => {
  //cargarTodosAutos();
  const autos = [
  {
    id: 1,
    marca: "Toyota",
    patente: "ABC123",
    categoria: "Sedán",
    capacidad: 5,
    precio: 15000,
    imagen: null,
  },
  {
    id: 2,
    marca: "Ford",
    patente: "DEF456",
    categoria: "SUV",
    capacidad: 7,
    precio: 20000,
    imagen: null,
  },
  {
    id: 3,
    marca: "Chevrolet",
    patente: "GHI789",
    categoria: "Hatchback",
    capacidad: 5,
    precio: 13000,
    imagen: null,
  },
  {
    id: 4,
    marca: "Volkswagen",
    patente: "JKL012",
    categoria: "Sedán",
    capacidad: 5,
    precio: 14000,
    imagen: null,
  },
  {
    id: 5,
    marca: "Honda",
    patente: "MNO345",
    categoria: "SUV",
    capacidad: 5,
    precio: 18000,
    imagen: null,
  },
  {
    id: 6,
    marca: "Nissan",
    patente: "PQR678",
    categoria: "Camioneta",
    capacidad: 2,
    precio: 17000,
    imagen: null,
  },
  {
    id: 7,
    marca: "Fiat",
    patente: "STU901",
    categoria: "Compacto",
    capacidad: 4,
    precio: 12000,
    imagen: null,
  },
  {
    id: 8,
    marca: "Renault",
    patente: "VWX234",
    categoria: "Sedán",
    capacidad: 5,
    precio: 13500,
    imagen: null
  },
  {
    id: 9,
    marca: "Peugeot",
    patente: "YZA567",
    categoria: "SUV",
    capacidad: 5,
    precio: 19000,
    imagen: null,
  },
  {
    id: 10,
    marca: "Kia",
    patente: "BCD890",
    categoria: "Hatchback",
    capacidad: 5,
    precio: 16000,
    imagen: "https://via.placeholder.com/300x200?text=Fiat",
  },
  ]
setAutosDisponibles(autos)
}, []);

const handleSubmit = (auto) =>{
  const alquilerActual = JSON.parse(localStorage.getItem("alquiler"));
  alquilerActual.auto = auto;
  localStorage.setItem("alquiler", JSON.stringify(alquilerActual));
  window.location.href = "/seleccionar-conductor";
  console.log(auto)
}


return(
      <>
        <div>  
            <DatosAlquiler datos={JSON.parse(localStorage.getItem("alquiler"))} />
        </div>
        <div className="container-fluid bg-dark text-light py-4">
          <VehiculosDisponibles vehiculos={autosDisponibles} onSubmit={handleSubmit}/>
        </div>
      </>
)
}
