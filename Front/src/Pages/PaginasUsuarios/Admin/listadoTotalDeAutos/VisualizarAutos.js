import React, { useEffect, useState } from "react";
import VehiculosDisponibles from "./listado.js";
import { useLocation } from "react-router-dom";

export default function VerAutos() {
  const [autosDisponibles, setAutosDisponibles] = useState([]);
  const location = useLocation();
  const sucursal = location.state?.sucursal;
  console.log(sucursal)

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
          console.log(data);
        } catch (error) {
          console.error("Error al cargar autos:", error);
        }
      };

      fetchAutos();
  }, []);

  return (
    <div className="container-fluid bg-dark text-light py-4">
      <VehiculosDisponibles
        vehiculos={autosDisponibles}
        onSubmit={(auto) => console.log("Seleccionado:", auto)}
      />
    </div>
  );
}