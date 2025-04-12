const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Cambia esta URL a la URL de tu servidor en Render
  const response = await fetch('https://registro-horario-backend-1.onrender.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (response.ok) {
    window.location.href = 'admin.html';  // Redirige al admin
  } else {
    errorMessage.textContent = result.message;
  }
});
