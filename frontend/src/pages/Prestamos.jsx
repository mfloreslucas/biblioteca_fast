import React, { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';

export default function Prestamos() {
  const [raw, setRaw] = useState({ rows: [], duration: 0 });
  const [opt, setOpt] = useState({ rows: [], duration: 0 });
  const [loadingRaw, setLoadingRaw] = useState(true);
  const [loadingOpt, setLoadingOpt] = useState(true);

  useEffect(() => {
    setLoadingRaw(true);
    fetch('/api/prestamos/raw').then(r => r.json()).then(data => {
      setRaw(data);
      setLoadingRaw(false);
    });
    setLoadingOpt(true);
    fetch('/api/prestamos/optimized').then(r => r.json()).then(data => {
      setOpt(data);
      setLoadingOpt(false);
    });
  }, []);

  const columnsRaw = raw.rows[0] ? Object.keys(raw.rows[0]) : [];
  const columnsOpt = opt.rows[0] ? Object.keys(opt.rows[0]) : [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#183153]">Préstamos</h2>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Consulta RAW (sin optimizar)</h3>
        <div className="mb-2 text-sm text-gray-500">Tiempo: {raw.duration} ms | Filas: {raw.rows.length}</div>
        <DataTable columns={columnsRaw} data={raw.rows} loading={loadingRaw} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Consulta OPTIMIZADA (con índice/view)</h3>
        <div className="mb-2 text-sm text-gray-500">Tiempo: {opt.duration} ms | Filas: {opt.rows.length}</div>
        <DataTable columns={columnsOpt} data={opt.rows} loading={loadingOpt} />
      </div>
    </div>
  );
} 