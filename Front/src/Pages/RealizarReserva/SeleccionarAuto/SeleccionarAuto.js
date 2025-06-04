// Esto deberia enviar los datos guardados en el formulario al bakcend y devuelve una lista con los autos disponibles (a chekear)
import VehiculosDisponibles from "./listadoDisponible"
import DatosAlquiler from "./datosAlquiler"
import Filtrado from "../Home/FlotaAutos/filtrado";

import React, { useEffect, useState } from "react";

export default function SeleccionarAuto() {

  const [autosDisponibles, setAutosDisponibles] = useState([]);
  const [formData, setFormData] = useState({});
  const [autosFiltrados, setAutosFiltrados] = useState([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

 const [filtro, setFiltro] = useState({
    marca: '',
    capacidad: '',
    categoria: '',
    precioMin: 10000,
    precioMax: 25000
  });

  const quitarFiltro = () =>{
    setFiltro({
    marca: '',
    capacidad: '',
    categoria: '',
    precioMin: 10000,
    precioMax: 25000
    });
    setAutosFiltrados(autosDisponibles); // muestra todos los autos
  };

  const aplicarFiltro = () => {
    const resultado = autosDisponibles.filter(auto => {
      const coincideMarca = filtro.marca === '' || auto.marca.toLowerCase().includes(filtro.marca.toLowerCase());
      const coincideCapacidad = filtro.capacidad === '' || auto.capacidad === parseInt(filtro.capacidad);
      const coincideCategoria = filtro.categoria === '' || auto.categoria.toLowerCase().includes(filtro.categoria.toLowerCase());
      const coincidePrecio = auto.precio >= filtro.precioMin && auto.precio <= filtro.precioMax;
      return coincideMarca && coincideCapacidad && coincideCategoria && coincidePrecio;
    });
    setAutosFiltrados(resultado);
  };

const FiltrarAutos = async () => {
  try {
    const storedData = JSON.parse(localStorage.getItem("alquiler"));
    if (!storedData) {
      throw new Error("No hay datos en el localStorage");
    }

    const sucursal = storedData?.sucursalEntrega
    const inicio = storedData?.inicio;
    const final = storedData?.fin;

    console.log(sucursal);
    console.log(inicio);
    console.log(final);

    setFormData(storedData);

    const url = `http://localhost:8080/auto/listar?nombreSucursal=${encodeURIComponent(sucursal)}&fechaDesde=${encodeURIComponent(inicio)}&fechaHasta=${encodeURIComponent(final)}&estadoAuto=DISPONIBLE&estadoAuto=EN_MANTENIMIENTO&estadoAuto=ALQUILADO`;

    console.log("URL generada:", url);
    const response = await fetch(url); // método GET

    if (!response.ok) {
      throw new Error("Error al obtener autos disponibles");
    }

    const autos = await response.json();
    setAutosDisponibles(autos);
    setAutosFiltrados(autos);
  } catch (error) {
    console.error("Error al enviar:", error);
    alert("Ocurrió un error al buscar autos disponibles ❌");
  }
};

// Cargar todos los autos al inicio, porque no hay formulario
useEffect(() => {
  FiltrarAutos();
  }, []);

  const handleSubmit = (auto) =>{
    const alquilerActual = JSON.parse(localStorage.getItem("alquiler"));
    alquilerActual.auto = auto;
    localStorage.setItem("alquiler", JSON.stringify(alquilerActual));
    window.location.href = "/seleccionar-conductor";
    console.log(auto)
  }

  console.log('xd')
  console.log(localStorage.getItem("alquiler"))

  return(
        <>
          <div>  
              <DatosAlquiler datos={JSON.parse(localStorage.getItem("alquiler"))} />
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
          <div className="container-fluid bg-dark text-light py-4">
            <VehiculosDisponibles vehiculos={autosFiltrados} onSubmit={handleSubmit}/>
          </div>
        </>
  )
}
