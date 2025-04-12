const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000; // Puerto predeterminado

// Middleware para servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, 'frontend')));

// En caso de que la URL no coincida con ningún archivo estático, se sirve el archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Conexión a la base de datos (esto es un ejemplo, ajusta según tu base de datos)
const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/miBaseDeDatos'; // Cambia por tu URI de base de datos

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => console.log('Error de conexión a la base de datos:', error));

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
