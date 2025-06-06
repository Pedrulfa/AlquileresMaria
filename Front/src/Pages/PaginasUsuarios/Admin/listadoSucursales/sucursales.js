import React, { useEffect, useState } from "react";
import Sucursales from "./listado.js";

export default function VerAutos() {
  const [listaSucursales, setSucursales] = useState([]);

  useEffect(() => {
    const obtenerSucursales = async () => {
      try {
        const response = await fetch("http://localhost:8080/sucursal/listar");
        if (response.ok) {
          const data = await response.json();
          setSucursales(data);
        } else {
          console.error("Error al obtener sucursales:", await response.text());
        }
      } catch (error) {
        console.error("Error en la conexión:", error);
      }
    };

    obtenerSucursales();
  }, []);

  return (
    <div className="container-fluid bg-dark text-light py-4">
      <Sucursales sucursales={listaSucursales} />
    </div>
  );
}