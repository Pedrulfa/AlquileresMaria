function VehiculosDisponibles({ vehiculos, onSubmit}) {
  return (
    <>
        <h1> Selecciona un Auto </h1>
        <div className="row">
        {vehiculos.map((auto) => (
            <div key={auto.id} className="col-md-4 mb-4">
            <div className="card">
                {auto.imagen ? (
                <img src={auto.imagen} alt="Vehículo" className="card-img-top" />
                ) : (
                <div className="card-img-top bg-secondary text-light text-center p-5">
                    Sin imagen
                </div>
                )}
                <div className="card-body">
                <h5 className="card-title">{auto.marca}</h5>
                <p className="card-text">Categoría: {auto.categoria}</p>
                <p className="card-text">Capacidad: {auto.capacidad}</p>
                <p className="card-text">Precio: ${auto.precio}</p>
                <button
                    className="btn btn-primary"
                    onClick={() => onSubmit(auto.id)}
                >
                    Seleccionar
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>
    </>
  );
}

export default VehiculosDisponibles;