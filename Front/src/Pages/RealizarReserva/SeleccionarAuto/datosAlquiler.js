import './datosAlquiler.css'

function DatosAlquiler ({ datos }){

    console.log(datos)
return (
    <>
        <div className="card card-datos light-dark p-3">
            <div className="d-flex flex-wrap  gap-4">
                <>
                    <div className="pe-4 border-end-black">
                    <p className="fw-bold mb-1">Sucursal de Entrega</p>
                    <p>{datos?.sucursalEntrega}</p>
                    </div>
                    <div className="pe-4 border-end-black">
                    <p className="fw-bold mb-1">Sucursal de Devolución</p>
                    <p>{datos?.sucursalEntrega}</p>
                    </div>
                </>
                <div className="pe-4 border-end-black">
                <p className="fw-bold mb-1">Fecha de Entrega</p>
                <p>{datos?.inicio}</p>
                </div>
                <div>
                <p className="fw-bold mb-1">Fecha de Devolución</p>
                <p>{datos?.fin}</p>
                </div>
            </div>
            </div>
    </>
)

}
export default DatosAlquiler;
