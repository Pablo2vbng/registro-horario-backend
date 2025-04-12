const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Middleware para procesar las solicitudes JSON
app.use(bodyParser.json());

// Servir archivos estáticos (es decir, el frontend) desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, 'frontend')));

// Ruta para el login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Aquí puedes agregar la lógica para verificar el usuario y contraseña en la base de datos.
  // Para efectos de prueba, vamos a usar datos estáticos:
  if (username === 'admin' && password === 'admin123') {
    res.json({ message: 'Login exitoso' });
  } else {
    res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
  }
});

// Ruta para servir el archivo index.html cuando se accede a la raíz (home)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Manejo de errores para rutas no encontradas
app.get('*', (req, res) => {
  res.status(404).send('Página no encontrada');
});

// Iniciar el servidor en el puerto adecuado
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
