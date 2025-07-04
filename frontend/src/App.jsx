import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Libros from './pages/Libros.jsx';
import Prestamos from './pages/Prestamos.jsx';
import Usuarios from './pages/Usuarios.jsx';
import Reservas from './pages/Reservas.jsx';
import Multas from './pages/Multas.jsx';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#f5f7fa]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/libros" element={<Libros />} />
              <Route path="/prestamos" element={<Prestamos />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/multas" element={<Multas />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App; 