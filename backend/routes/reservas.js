import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Consulta RAW (sin optimizar)
router.get('/raw', async (req, res) => {
  const start = Date.now();
  const result = await pool.query('SELECT * FROM Reserva');
  const duration = Date.now() - start;
  res.json({ duration, rows: result.rows });
});

// Consulta OPTIMIZADA (usando índice o view, ejemplo: reservas activas)
router.get('/optimized', async (req, res) => {
  const start = Date.now();
  const result = await pool.query('SELECT * FROM Reserva WHERE Estado_Reserva = \'Activa\'');
  const duration = Date.now() - start;
  res.json({ duration, rows: result.rows });
});

export default router; 