// URL de la API en Render
const API_URL = 'https://registro-horario-backend.onrender.com/login';

// Selección de elementos del DOM
const loginForm = document.getElementById('loginForm');
const usuarioInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Función para manejar el inicio de sesión
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  // Obtener valores del formulario
  const usuario = usuarioInput.value;
  const password = passwordInput.value;

  // Enviar la solicitud al backend
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, password })
    });

    const data = await response.json();

    if (data.success) {
      // Redirigir al admin o trabajador
      if (data.usuario.usuario === 'Pablo2vbng') {
        alert('Bienvenido, Admin');
        // Redirige a la vista del admin
        window.location.href = '/admin.html'; 
      } else {
        alert('Bienvenido, ' + data.usuario.usuario);
        // Redirigir al trabajador a la página de fichaje
        window.location.href = '/fichaje.html';
      }
    } else {
      // Mostrar mensaje de error
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    errorMessage.textContent = 'Hubo un problema con la conexión. Intenta de nuevo.';
    errorMessage.style.display = 'block';
  }
});
