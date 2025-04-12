const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // URL del backend en Render
  const response = await fetch('https://mi-servidor.onrender.com/login', {  // Reemplaza por tu URL de Render
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (response.ok) {
    window.location.href = 'admin.html'; // Redirige al admin si el login es exitoso
  } else {
    errorMessage.textContent = result.message; // Muestra el mensaje de error si las credenciales son incorrectas
  }
});
