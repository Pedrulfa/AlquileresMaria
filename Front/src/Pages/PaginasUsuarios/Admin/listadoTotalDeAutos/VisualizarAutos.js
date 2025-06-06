import React, { useEffect, useState } from "react";
import VehiculosDisponibles from "./listado.js";

export default function VerAutos() {
  const [autosDisponibles, setAutosDisponibles] = useState([]);

  useEffect(() => {
        const fetchAutos = async () => {
        const token = localStorage.getItem("token");

        try {
          const response = await fetch("http://localhost:8080/auto/listar", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error(`Error al obtener autos: ${response.statusText}`);
          }

          const data = await response.json(); 
          setAutosDisponibles(data);
        } catch (error) {
          console.error("Error al cargar los autos:", error);
          alert("Error al cargar los autos.");
        }
      };

      fetchAutos();
    }, []);

  return (
    <div className="container-fluid bg-dark text-light py-4">
      <VehiculosDisponibles vehiculos={autosDisponibles} onSubmit={(auto) => console.log("Seleccionado:", auto)} />
    </div>
  );
}