CREATE TABLE IF NOT EXISTS libros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255),
  autor VARCHAR(255),
  anio INT
);

-- Índice para simular consulta optimizada
CREATE INDEX IF NOT EXISTS idx_libros_titulo ON libros(titulo);

-- Datos de ejemplo
INSERT INTO libros (titulo, autor, anio) VALUES
('Cien años de soledad', 'Gabriel García Márquez', 1967),
('Rayuela', 'Julio Cortázar', 1963),
('El túnel', 'Ernesto Sabato', 1948); 