import React from 'react';

export default function MetricCard({ title, value, icon, color = 'bg-white', textColor = 'text-[#183153]' }) {
  return (
    <div className={`rounded-xl shadow p-5 flex flex-col items-center ${color} ${textColor}`}>
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm mt-1 opacity-80">{title}</div>
    </div>
  );
} 