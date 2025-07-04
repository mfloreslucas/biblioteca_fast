import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/libros', label: 'Libros', icon: '📚' },
  { to: '/prestamos', label: 'Préstamos', icon: '🔄' },
  { to: '/usuarios', label: 'Usuarios', icon: '👤' },
  { to: '/reservas', label: 'Reservas', icon: '📅' },
  { to: '/multas', label: 'Multas', icon: '💸' },
];

export default function Sidebar() {
  return (
    <aside className="bg-[#183153] text-white w-56 min-h-screen flex flex-col py-6 px-2">
      <div className="flex flex-col items-center mb-8">
        <img src="/bibliotecaaa.png" alt="BiblioGest Logo" className="w-16 h-16 mb-2" />
        <span className="font-bold text-xl tracking-wide">BiblioGest</span>
      </div>
      <nav className="flex-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${isActive ? 'bg-[#ff9900] text-[#183153]' : 'hover:bg-[#2c4067]'} `
            }
            end
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
} 