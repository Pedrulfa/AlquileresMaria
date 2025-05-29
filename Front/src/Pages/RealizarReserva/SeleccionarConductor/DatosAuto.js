export default function ResumenAutoAlquiler({ auto, alquiler }) {

  return (
    <div className="card shadow p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h5 className="card-title">{auto?.marca} -  {auto?.modelo}</h5>
      <p className="text-muted">
        Categoría {auto?.categoria}
      </p>
      <p className="text-danger">🔒 Garantía (agregar el reembolso)</p>

      {auto?.imagen && (
        <img
          src={auto.imagen}
          className="img-fluid my-3"
          style={{ maxHeight: "180px", objectFit: "contain" }}
          alt="Imagen del auto"
        />
      )}
      <p> Patente: {auto.patente}</p>
      <p> Capacidad: {auto.capacidad} personas</p>
      <p> Precio: ${auto.precioPorDia}/dia</p>

      <button onClick={() => window.location.href = "/seleccionar-auto"}> Cambiar auto</button>

      <hr />

      <h6 className="text-primary">Entrega</h6>
      <p>{alquiler?.sucursalEntrega} - {alquiler?.inicio}</p>

      <h6 className="text-primary">Devolución</h6>
      <p>{alquiler?.sucursalDevolucion} - {alquiler?.fin}</p>

      <hr />

      <h6>Detalle de pago</h6>
      <ul className="list-unstyled">
        <li>🟢 Reserva por {alquiler?.dias} día(s) : ${alquiler?.precio}</li>
      </ul>

      <hr />
    </div>
  );
}