import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Si usás routers, importalos acá
import viewsRouter from './routes/views.js';
import librosRouter from './routes/libros.js';
import prestamosRouter from './routes/prestamos.js';
import usuariosRouter from './routes/usuarios.js';
import reservasRouter from './routes/reservas.js';
import multasRouter from './routes/multas.js';

// Inicialización de __dirname y app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/views', viewsRouter);
app.use('/api/libros', librosRouter);
app.use('/api/prestamos', prestamosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/reservas', reservasRouter);
app.use('/api/multas', multasRouter);

// Para que React maneje el routing en el frontend (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});