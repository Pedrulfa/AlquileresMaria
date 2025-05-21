import React, { useState, useEffect } from "react";
import AlquilerForm from "./formulario";
import ListadoVehiculos from "./listado";
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="container-fluid bg-dark text-light py-4">
        <AlquilerForm onSubmit={handleFormSubmit} />
      </div>
      <div className="container mt-4">        
        <ListadoVehiculos vehiculos={autosDisponibles} /> 
      </div>
    </div>
  );
}