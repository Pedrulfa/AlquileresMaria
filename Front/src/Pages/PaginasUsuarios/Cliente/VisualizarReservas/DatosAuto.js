import React from "react";


export default function DatosAuto( {auto}) {

    return (
        <div>
            <h5>{auto.marca} - {auto.modelo} </h5>
            <p>Patente: {auto.patente}</p>
            <p>Categoría: {auto.categoria}</p>
            <p>Capacidad: {auto.capacidad} personas</p>
            <p>Rembolso: {auto.rembolso}</p>
            <p>Sucursal: {auto.sucursal}</p>
            <div>
                <p className="card-text mb-0">Precio: ${auto.precioPorDia} / dia</p>
            </div>
        </div>
    )
}