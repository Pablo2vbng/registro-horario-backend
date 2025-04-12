const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config(); // Para leer las variables de entorno si usas .env localmente

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 📦 Conexión a la base de datos usando variables de entorno (seguro para Render)
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // ejemplo: 'registro-horario-db.csdiseaoiwob.us-east-1.rds.amazonaws.com'
  user: process.env.DB_USER,       // ejemplo: 'Pablo2vbng'
  password: process.env.DB_PASSWORD, // ejemplo: 'Piramide73+'
  database: process.env.DB_NAME    // ejemplo: 'registro_horario'
});

// Verificar conexión
db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conectado a la base de datos MySQL');
  }
});

// 🟢 Endpoint de login
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ?';
  db.query(query, [usuario, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error interno' });
    if (results.length > 0) {
      res.json({ success: true, usuario: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});

// 🟢 Endpoint para registrar fichaje
app.post('/registrar-fichaje', (req, res) => {
  const { usuario_id, tipo, latitud, longitud } = req.body;
  const fecha = new Date(); // Fecha actual del servidor

  const query = 'INSERT INTO fichajes (usuario_id, fecha, latitud, longitud, tipo) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [usuario_id, fecha, latitud, longitud, tipo], (err) => {
    if (err) return res.status(500).json({ error: 'Error al guardar fichaje' });
    res.json({ success: true });
  });
});

// 🔵 Puerto del servidor (Render usa process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
