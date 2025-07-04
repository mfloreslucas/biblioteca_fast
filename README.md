# Biblioteca Demo - Node.js, React, PostgreSQL (Railway)

Este proyecto es un monorepo con backend (Node.js + Express) y frontend (React + TailwindCSS) para demostrar diferencias de rendimiento entre consultas SQL optimizadas y no optimizadas sobre una base de datos PostgreSQL.

## Estructura
- `/backend` → API REST (Node.js + Express)
- `/frontend` → Dashboard (React + TailwindCSS)

## Despliegue rápido
1. Sube este repo a GitHub.
2. Conéctalo a Railway (monorepo, selecciona `/backend` como servicio principal).
3. Crea una base de datos PostgreSQL en Railway y copia la URL en el archivo `.env` de `/backend`.
4. Instala dependencias y ejecuta ambos proyectos localmente si lo deseas.

## Comandos útiles
- Instalar dependencias backend: `cd backend && npm install`
- Instalar dependencias frontend: `cd frontend && npm install`
- Correr backend: `cd backend && npm run dev`
- Correr frontend: `cd frontend && npm start`

---

Cuando tengas la estructura SQL, agrégala en `/backend/db/schema.sql` y actualiza las consultas en los endpoints. 