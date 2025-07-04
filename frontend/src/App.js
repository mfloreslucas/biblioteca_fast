import React, { useState } from 'react';

function App() {
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuery = async (type) => {
    setLoading(true);
    setModal(true);
    setResult(null);
    const res = await fetch(`/api/${type}`);
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Demo Biblioteca - Consultas SQL</h1>
        <div className="flex gap-4 mb-6">
          <button onClick={() => fetchQuery('raw-query')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Consulta sin optimizar</button>
          <button onClick={() => fetchQuery('optimized-query')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Consulta optimizada</button>
        </div>
        {/* Aquí iría el dashboard tipo la imagen, por ahora placeholder */}
        <div className="bg-gray-100 rounded p-4 text-center text-gray-500">Dashboard de resultados aquí...</div>
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl min-w-[300px] relative">
            <button onClick={() => setModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
            <h2 className="text-lg font-bold mb-2">Resultado de la consulta</h2>
            {loading && <div>Cargando...</div>}
            {result && (
              <div>
                <div className="mb-2">⏱️ <b>{result.duration}</b> ms</div>
                <div className="text-xs text-gray-500">Filas: {result.rows.length}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 