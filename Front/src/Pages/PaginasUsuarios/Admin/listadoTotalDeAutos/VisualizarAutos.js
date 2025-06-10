import React, { useEffect, useState } from "react";
import VehiculosDisponibles from "./listado.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Filtrado from "../../../RealizarReserva/Home/FlotaAutos/filtrado"

export default function VerAutos() {
  const [autosDisponibles, setAutosDisponibles] = useState([]);
  const [autosFiltrados, setAutosFiltrados] = useState([]);
  const location = useLocation();
  const sucursal = location.state?.sucursal;
  const navigate = useNavigate()
  console.log(sucursal)

    const [filtro, setFiltro] = useState({
      marca: '',
      capacidad: '',
      categoria: '',
      precioMin: 0,
      precioMax: 10000
    });
  
    const aplicarFiltro = () => {
      const resultado = autosDisponibles.filter(auto => {
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
      precioMin: 0,
      precioMax: 10000
      });
      setAutosFiltrados(setAutosDisponibles); // muestra todos los autos
    };

    useEffect(() => {

      if (!sucursal) return;

      const fetchAutos = async () => {
        try {
          const url = `http://localhost:8080/auto/listar?nombreSucursal=${encodeURIComponent(sucursal)}&estadoAuto=DISPONIBLE&estadoAuto=EN_MANTENIMIENTO&estadoAuto=ALQUILADO`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Error al obtener los autos");
          }

          const data = await response.json();
          setAutosDisponibles(data);
          setAutosFiltrados(data);
        } catch (error) {
          console.error("Error al cargar autos:", error);
        }
      };

      fetchAutos();
  }, []);

  const handleVolver = () =>{
    navigate("/admin");
  }

  const handleAgregar = () =>{
    navigate("/Admin/CargarVehiculo/CargarVehiculo.js", {state : {sucursal}})
  }

  return (
    <>
      <button onClick={handleVolver}> volver </button> 
      <button onClick={handleAgregar}> Agregar auto </button>
      <div>
        <Filtrado filtro={filtro} setFiltro={setFiltro} onFiltrar={aplicarFiltro} onDesfiltrar={quitarFiltro} auto={autosDisponibles}/>
      </div>
      <div className="container-fluid bg-dark text-light py-4">
        <VehiculosDisponibles
          vehiculos={autosFiltrados}
          onSubmit={(auto) => console.log("Seleccionado:", auto)}
        />
        {autosDisponibles.length === 0 && (
          <h1>No hay autos disponibles</h1>
        )}
      </div>
    </>
  );
}