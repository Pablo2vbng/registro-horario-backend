const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, 'frontend')));

// Redirigir la ruta raíz a 'frontend/index.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Redirigir otras rutas, si es necesario
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'admin.html'));
});

app.get('/empleado', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'empleado.html'));
});

// Escuchar en el puerto 10000 (o el puerto que elijas)
app.listen(10000, () => {
  console.log('Servidor corriendo en el puerto 10000');
});
