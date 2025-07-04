import React, { useEffect, useState } from 'react';
import MetricCard from '../components/MetricCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#ff9900', '#183153', '#8884d8', '#82ca9d', '#ffc658'];

export default function Home() {
  const [metrics, setMetrics] = useState({});
  const [librosMasPrestados, setLibrosMasPrestados] = useState([]);
  const [prestamosPorTipo, setPrestamosPorTipo] = useState([]);
  const [sectorNuevo, setSectorNuevo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [libros, prestamos, usuarios, reservas, multas, lmp, ppt, sn] = await Promise.all([
        fetch('/api/libros/raw').then(r => r.json()),
        fetch('/api/prestamos/raw').then(r => r.json()),
        fetch('/api/usuarios/raw').then(r => r.json()),
        fetch('/api/reservas/raw').then(r => r.json()),
        fetch('/api/multas/raw').then(r => r.json()),
        fetch('/api/views/libros_mas_prestados').then(r => r.json()),
        fetch('/api/views/prestamos_por_tipo_usuario').then(r => r.json()),
        fetch('/api/views/sector_nuevo_impacto').then(r => r.json()),
      ]);
      setMetrics({
        libros: libros.rows.length,
        prestamos: prestamos.rows.length,
        usuarios: usuarios.rows.length,
        reservas: reservas.rows.length,
        multas: multas.rows.length,
      });
      setLibrosMasPrestados(lmp.rows);
      setPrestamosPorTipo(ppt.rows);
      setSectorNuevo(sn.rows);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#183153]">Dashboard General</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <MetricCard title="Libros" value={metrics.libros} icon="📚" color="bg-[#ff9900]" textColor="text-white" />
        <MetricCard title="Préstamos" value={metrics.prestamos} icon="🔄" color="bg-[#183153]" textColor="text-white" />
        <MetricCard title="Usuarios" value={metrics.usuarios} icon="👤" color="bg-white" textColor="text-[#183153]" />
        <MetricCard title="Reservas" value={metrics.reservas} icon="📅" color="bg-white" textColor="text-[#183153]" />
        <MetricCard title="Multas" value={metrics.multas} icon="💸" color="bg-white" textColor="text-[#183153]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold mb-2 text-[#183153]">Libros más prestados</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={librosMasPrestados} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="Titulo" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="cantidad_prestamos" fill="#ff9900" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-bold mb-2 text-[#183153]">Préstamos por tipo de usuario</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={prestamosPorTipo} dataKey="cantidad_prestamos" nameKey="tipo_usuario" cx="50%" cy="50%" outerRadius={80} label>
                {prestamosPorTipo.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h3 className="font-bold mb-2 text-[#183153]">Impacto del Sector Nuevo</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sectorNuevo}>
            <XAxis dataKey="titulo" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ejemplares_sector_nuevo" fill="#183153" name="Ejemplares" />
            <Bar dataKey="prestamos_sector_nuevo" fill="#ff9900" name="Préstamos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 