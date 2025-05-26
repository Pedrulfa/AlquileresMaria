import React, { useEffect, useState } from "react";
import Sucursales from "./listado.js";

export default function VerAutos() {
  const [listaSucursales, setSucursales] = useState([]);

  useEffect(() => {
  const listaSucursales = [
    { id: 1, marca: "La Plata", imagen: null },
    { id: 2, marca: "Bragado",  imagen: null },
    { id: 3, marca: "Tero Violado",  imagen: null },
  ];
  setSucursales(listaSucursales);
}, []);

  return (
    <div className="container-fluid bg-dark text-light py-4">
      <Sucursales sucursales={listaSucursales} />
    </div>
  );
}