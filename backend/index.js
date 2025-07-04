import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import viewsRouter from './routes/views.js';
import librosRouter from './routes/libros.js';
import prestamosRouter from './routes/prestamos.js';
import usuariosRouter from './routes/usuarios.js';
import reservasRouter from './routes/reservas.js';
import multasRouter from './routes/multas.js';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Para que React maneje el routing en el frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Endpoint: consulta SQL sin optimizar
app.get('/api/raw-query', async (req, res) => {
  const start = Date.now();
  const result = await pool.query('SELECT * FROM libros'); // Ejemplo simple
  const duration = Date.now() - start;
  res.json({ duration, rows: result.rows });
});

// Endpoint: consulta SQL optimizada (simulada)
app.get('/api/optimized-query', async (req, res) => {
  const start = Date.now();
  const result = await pool.query('SELECT * FROM libros /*+ INDEX(libros idx_libros_titulo) */'); // Simulación
  const duration = Date.now() - start;
  res.json({ duration, rows: result.rows });
});

app.use('/api/views', viewsRouter);
app.use('/api/libros', librosRouter);
app.use('/api/prestamos', prestamosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/reservas', reservasRouter);
app.use('/api/multas', multasRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
}); 