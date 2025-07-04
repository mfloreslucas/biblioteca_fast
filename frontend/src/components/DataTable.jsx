import React from 'react';

export default function DataTable({ columns, data, loading }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} className="px-4 py-2 text-left bg-[#f5f7fa] text-[#183153] font-semibold">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length} className="text-center py-6">Cargando...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length} className="text-center py-6">Sin datos</td></tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="hover:bg-[#f0f4fa]">
                {columns.map(col => (
                  <td key={col} className="px-4 py-2 border-b border-[#e5e7eb]">{row[col]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 