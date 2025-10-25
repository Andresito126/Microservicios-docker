const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// get mi nombre
app.get('/apellido', (req, res) => {
    res.json({ nombre_completo: "Andre Julian Gutierrez Alcazar - 7mo A - 233881 - SOFTWARE!" }); 
});

// get estudiantes
app.get('/estudiantes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM estudiantes');
        res.json(rows);
    } catch (err) {
        console.error("Error al consultar:", err);
        res.status(500).json({ error: 'Error en BD' });
    }
});

// psot
app.post('/estudiantes', async (req, res) => {
    try {
        const { matricula, nombre, carrera, grupo } = req.body;
        await pool.execute(
            'INSERT INTO estudiantes (matricula, nombre, carrera, grupo) VALUES (?, ?, ?, ?)',
            [matricula, nombre, carrera, grupo]
        );
        res.status(201).json({ message: 'Estudiante creado' });
    } catch (err) {
        console.error("Error al crear:", err);
        res.status(500).json({ error: 'Error en BD' });
    }
});

app.listen(port, () => {
    console.log(`API de Andre corriendo en puerto ${port}`);
});