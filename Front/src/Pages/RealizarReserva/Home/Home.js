import React, { useState, useEffect } from "react";
import AlquilerForm from "./Bienvenida/formulario";
import ListadoVehiculos from "./FlotaAutos/listado";
import HeroSection from "./Bienvenida/HeroSection";
import Filtrado from "./FlotaAutos/filtrado";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import autoImage from "./Bienvenida/static/auto.jpg"; // Imagen temporal para todos los autos

export default function Home() {
  const [formData, setFormData] = useState(null);
  const [autos, setAutos] = useState([]);
  const [autosFiltrados, setAutosFiltrados] = useState([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtro, setFiltro] = useState({
    marca: '',
    capacidad: '',
    categoria: '',
    precioMin: 10000,
    precioMax: 25000
  });


  localStorage.removeItem("alquiler");

  const aplicarFiltro = () => {
    const resultado = autos.filter(auto => {
      const coincideMarca = filtro.marca === '' || auto.marca.toLowerCase().includes(filtro.marca.toLowerCase());
      const coincideCapacidad = filtro.capacidad === '' || auto.capacidad === parseInt(filtro.capacidad);
      const coincideCategoria = filtro.categoria === '' || auto.categoria.toLowerCase().includes(filtro.categoria.toLowerCase());
      const coincidePrecio = auto.precioPorDia >= filtro.precioMin && auto.precioPorDia <= filtro.precioMax;
      return coincideMarca && coincideCapacidad && coincideCategoria && coincidePrecio;
    });
    setAutosFiltrados(resultado);
  };

  const quitarFiltro = () =>{
    setFiltro({
    marca: '',
    capacidad: '',
    categoria: '',
    precioMin: 10000,
    precioMax: 25000
    });
    setAutosFiltrados(autos); // muestra todos los autos
  };

  const sucursalesMap = new Map();
    autos.forEach(auto => {
      const sucursal = auto.sucursal;
      sucursalesMap.set(sucursal, sucursal); // clave y valor son el nombre
    });


  const sucursalesUnicas = Array.from(sucursalesMap.values());

  // deberia listar los autos que estan disponibles nomas
  useEffect(() => {
    const obtenerAutos = async () => {
      try {
        const response = await fetch("http://localhost:8080/auto/listar?estadoAuto=DISPONIBLE&estadoAuto=EN_MANTENIMIENTO&estadoAuto=ALQUILADO");

        if (!response.ok) {
          throw new Error("Error al obtener los autos");
        }

        const data = await response.json();
        setAutos(data);
        setAutosFiltrados(data);
      } catch (error) {
        console.error("Error al cargar autos:", error);
      }
    };

    obtenerAutos();
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
      <HeroSection sucursales={sucursalesUnicas} onSubmit={handleFormSubmit} />

      <div>
        <h1 className="mi-titulo text-center mt-5">Nuestra flota</h1>
      </div>
      <div className="text-center my-4">
        <button
          className="btn btn-outline-light"
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
        >
          {mostrarFiltros ? 'Ocultar filtros' : 'Filtrar 🔍'}
        </button>
      </div>
      <div>
        {mostrarFiltros && (
        <Filtrado filtro={filtro} setFiltro={setFiltro} onFiltrar={aplicarFiltro} onDesfiltrar={quitarFiltro}/>
        )}
      </div>
      {/* 🔽 Listado filtrado */}
      <div className="container mt-5">
        <ListadoVehiculos vehiculos={autosFiltrados} />
      </div>
    </div>
  );
}
