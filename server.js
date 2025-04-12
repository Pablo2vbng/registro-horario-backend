const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Conexión a la base de datos MongoDB (reemplaza con tu URI)
mongoose.connect('mongodb://localhost:27017/registro_horario', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch(err => {
    console.log('Error al conectar a la base de datos:', err);
  });

// Servir archivos estáticos desde la carpeta 'registrohorario/frontend/'
app.use(express.static(path.join(__dirname, 'registrohorario', 'frontend')));

// Ruta principal para servir el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'registrohorario', 'frontend', 'index.html'));
});

// Ruta para cualquier otro archivo estático que exista en 'registrohorario/frontend/'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'registrohorario', 'frontend', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
