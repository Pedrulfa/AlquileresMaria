import React from 'react';

function Home() {
  return (
    <div className="form-container" style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#1a1a1a', color: '#e06c75', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Listado de Vehículos</h2>

      {/* Aquí irá el listado dinámico de vehículos desde el backend */}
      <div className="vehiculos-list" style={{ borderTop: '1px solid #e06c75', paddingTop: '10px' }}>
        {/* Por ahora vacío, luego va el map de vehículos */}
      </div>
    </div>
  );
}

export default Home;