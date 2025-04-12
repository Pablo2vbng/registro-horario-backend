// Importar dependencias
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

// Crear una instancia de la aplicación Express
const app = express();

// Configuración de middlewares
app.use(cors()); // Permite solicitudes desde cualquier origen
app.use(bodyParser.json()); // Analiza las solicitudes con datos JSON

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, 'frontend')));

// Ruta principal que sirve el archivo index.html del frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Rutas del backend (por ejemplo, para obtener fichajes)
app.get('/fichajes/:periodo', (req, res) => {
  const periodo = req.params.periodo;
  const username = req.query.username; // Suponemos que el nombre de usuario se pasa como parámetro

  // Consultar los fichajes en la base de datos según el periodo y el username
  let query = 'SELECT * FROM fichajes WHERE username = ?';
  if (periodo === 'diario') {
    query += ' AND DATE(fecha_hora) = CURDATE()';
  } else if (periodo === 'semanal') {
    query += ' AND WEEK(fecha_hora) = WEEK(CURDATE())';
  } else if (periodo === 'mensual') {
    query += ' AND MONTH(fecha_hora) = MONTH(CURDATE())';
  }

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error al obtener fichajes:', err);
      return res.status(500).json({ message: 'Error al obtener fichajes' });
    }

    res.json(results); // Devolver los resultados como JSON
  });
});

// Ruta para registrar un fichaje (puedes agregar validación y otros datos según tu aplicación)
app.post('/registrar-fichaje', (req, res) => {
  const { username, action, fecha_hora } = req.body;

  const query = 'INSERT INTO fichajes (username, action, fecha_hora) VALUES (?, ?, ?)';
  db.query(query, [username, action, fecha_hora], (err, results) => {
    if (err) {
      console.error('Error al registrar el fichaje:', err);
      return res.status(500).json({ message: 'Error al registrar el fichaje' });
    }

    res.json({ message: 'Fichaje registrado exitosamente' });
  });
});

// Otras rutas del backend pueden ir aquí (si es necesario)

// Iniciar el servidor en el puerto 10000 o el puerto especificado en la variable de entorno
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
