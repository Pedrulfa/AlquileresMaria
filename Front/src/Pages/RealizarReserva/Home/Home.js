import React, { useState, useEffect } from "react";
import AlquilerForm from "./Bienvenida/formulario";
import ListadoVehiculos from "./FlotaAutos/listado";
import HeroSection from "./Bienvenida/HeroSection";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import autoImage from "./Bienvenida/static/auto.jpg"; // Imagen temporal para todos los autos

export default function Home() {
  const [formData, setFormData] = useState(null);
  const [autos, setAutos] = useState([]);
  const [autosFiltrados, setAutosFiltrados] = useState([]);
  const [filtro, setFiltro] = useState({
    marca: '',
    capacidad: '',
    categoria: ''
  });

  const aplicarFiltro = () => {
    const resultado = autos.filter(auto => {
      const coincideMarca = filtro.marca === '' || auto.marca.toLowerCase().includes(filtro.marca.toLowerCase());
      const coincideCapacidad = filtro.capacidad === '' || auto.capacidad === parseInt(filtro.capacidad);
      const coincideCategoria = filtro.categoria === '' || auto.categoria.toLowerCase().includes(filtro.categoria.toLowerCase());
      return coincideMarca && coincideCapacidad && coincideCategoria;
    });
    setAutosFiltrados(resultado);
  };

  // Cargar autos de forma local (temporal)
  useEffect(() => {
    const autos = [
      { id: 1, marca: "Toyota", patente: "ABC123", categoria: "Sedán", capacidad: 5, precio: 15000, imagen: autoImage },
      { id: 2, marca: "Ford", patente: "DEF456", categoria: "SUV", capacidad: 7, precio: 20000, imagen: autoImage },
      { id: 3, marca: "Chevrolet", patente: "GHI789", categoria: "Hatchback", capacidad: 5, precio: 13000, imagen: autoImage },
      { id: 4, marca: "Volkswagen", patente: "JKL012", categoria: "Sedán", capacidad: 5, precio: 14000, imagen: autoImage },
      { id: 5, marca: "Honda", patente: "MNO345", categoria: "SUV", capacidad: 5, precio: 18000, imagen: autoImage },
      { id: 6, marca: "Nissan", patente: "PQR678", categoria: "Camioneta", capacidad: 2, precio: 17000, imagen: autoImage },
      { id: 7, marca: "Fiat", patente: "STU901", categoria: "Compacto", capacidad: 4, precio: 12000, imagen: autoImage },
      { id: 8, marca: "Renault", patente: "VWX234", categoria: "Sedán", capacidad: 5, precio: 13500, imagen: autoImage },
      { id: 9, marca: "Peugeot", patente: "YZA567", categoria: "SUV", capacidad: 5, precio: 19000, imagen: autoImage },
      { id: 10, marca: "Kia", patente: "BCD890", categoria: "Hatchback", capacidad: 5, precio: 16000, imagen: autoImage },
    ];
    setAutos(autos);
    setAutosFiltrados(autos);
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
    <div className="container-fluid bg-black text-light px-0">
      <HeroSection onSubmit={handleFormSubmit} />

      <div>
        <h1 className="mi-titulo text-center mt-5">Nuestra flota</h1>
      </div>

      {/* 🎯 Sección de filtros */}
      <div className="container mt-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="form-label">Marca</label>
            <input
              type="text"
              className="form-control"
              value={filtro.marca}
              onChange={(e) => setFiltro({ ...filtro, marca: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Capacidad</label>
            <input
              type="number"
              className="form-control"
              value={filtro.capacidad}
              onChange={(e) => setFiltro({ ...filtro, capacidad: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Categoría</label>
            <input
              type="text"
              className="form-control"
              value={filtro.categoria}
              onChange={(e) => setFiltro({ ...filtro, categoria: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100" onClick={aplicarFiltro}>
              Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* 🔽 Listado filtrado */}
      <div className="container mt-5">
        <ListadoVehiculos vehiculos={autosFiltrados} />
      </div>
    </div>
  );
}
