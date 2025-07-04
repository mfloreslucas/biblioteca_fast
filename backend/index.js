import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
}); 