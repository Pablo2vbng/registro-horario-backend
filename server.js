const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'Pablo2vbng' && password === 'Piramide73+') {
    return res.status(200).json({ message: 'Admin logged in' });
  }

  db.query('SELECT * FROM trabajadores WHERE username = ? AND password = ?', [username, password], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.length > 0) {
      return res.status(200).json({ message: 'Logged in successfully', worker: result[0] });
    }

    return res.status(401).json({ message: 'Invalid username or password' });
  });
});

app.post('/fichar', (req, res) => {
  const { username, action } = req.body;

  const now = new Date();
  const fechaHora = now.toISOString().slice(0, 19).replace('T', ' ');

  if (action === 'entrada' || action === 'salida') {
    db.query('INSERT INTO registros (username, action, fecha_hora) VALUES (?, ?, ?)', [username, action, fechaHora], (err, result) => {
      if (err) {
        console.error('Error inserting record into the database:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      
      return res.status(200).json({ message: 'Registro exitoso' });
    });
  } else {
    return res.status(400).json({ message: 'Invalid action' });
  }
});

app.get('/fichajes/diario', (req, res) => {
  const { username } = req.query;
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  db.query('SELECT * FROM registros WHERE username = ? AND fecha_hora LIKE ?', [username, `${today}%`], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    res.status(200).json(result);
  });
});

app.get('/fichajes/semanal', (req, res) => {
  const { username } = req.query;
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday of the current week
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6)); // Saturday of the current week

  db.query('SELECT * FROM registros WHERE username = ? AND fecha_hora BETWEEN ? AND ?', [username, startOfWeek.toISOString().slice(0, 19), endOfWeek.toISOString().slice(0, 19)], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    res.status(200).json(result);
  });
});

app.get('/fichajes/mensual', (req, res) => {
  const { username } = req.query;
  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // First day of the current month
  const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0); // Last day of the current month

  db.query('SELECT * FROM registros WHERE username = ? AND fecha_hora BETWEEN ? AND ?', [username, firstDayOfMonth.toISOString().slice(0, 19), lastDayOfMonth.toISOString().slice(0, 19)], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    res.status(200).json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
