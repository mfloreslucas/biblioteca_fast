import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

const views = [
  'prestamos_activos',
  'usuarios_mas_prestamos',
  'libros_mas_prestados',
  'estado_actual_biblioteca',
  'sector_nuevo_impacto',
  'prestamos_por_tipo_usuario'
];

views.forEach(view => {
  router.get(`/${view}`, async (req, res) => {
    const start = Date.now();
    const result = await pool.query(`SELECT * FROM ${view}`);
    const duration = Date.now() - start;
    res.json({ duration, rows: result.rows });
  });
});

export default router; 