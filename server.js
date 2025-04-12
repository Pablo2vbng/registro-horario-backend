const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Middleware para parsear el cuerpo de la petición
app.use(bodyParser.json());
app.use(cors());  // Habilita CORS para permitir solicitudes desde tu frontend

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'registro-horario-db.csdiseaoiwob.us-east-1.rds.amazonaws.com',
  user: 'Pablo2vbng',
  password: 'Piramide73+',
  database: 'registro_horario',
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Ruta para el login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Consulta SQL para verificar el usuario y la contraseña
  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login exitoso' });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });
});

// Ruta para obtener los fichajes (admin)
app.get('/fichajes/:periodo', (req, res) => {
  const { periodo } = req.params;
  const username = req.query.username;

  let query;
  if (periodo === 'diario') {
    query = 'SELECT * FROM fichajes WHERE username = ? AND DATE(fecha_hora) = CURDATE()';
  } else if (periodo === 'semanal') {
    query = 'SELECT * FROM fichajes WHERE username = ? AND YEARWEEK(fecha_hora, 1) = YEARWEEK(CURDATE(), 1)';
  } else if (periodo === 'mensual') {
    query = 'SELECT * FROM fichajes WHERE username = ? AND MONTH(fecha_hora) = MONTH(CURDATE())';
  }

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ message: 'Error en el servidor' });
    }

    res.status(200).json(results);
  });
});

// Servir el backend en el puerto 10000
app.listen(10000, () => {
  console.log('Servidor corriendo en el puerto 10000');
});
