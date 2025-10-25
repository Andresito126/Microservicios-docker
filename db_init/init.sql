CREATE DATABASE IF NOT EXISTS andre_student_db;
USE andre_student_db;

CREATE TABLE IF NOT EXISTS estudiantes (
    matricula VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    carrera VARCHAR(50),
    grupo VARCHAR(10)
);

INSERT INTO estudiantes (matricula, nombre, carrera, grupo)
VALUES
    ('233881', 'Andre Gutierrez', 'Software', '7A'),
    ('202501', 'Ana Garcia', 'Software', '7A')
ON DUPLICATE KEY UPDATE nombre=nombre;