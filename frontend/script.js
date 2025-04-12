const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Asegúrate de que esta URL sea la de tu servicio en Render
  const response = await fetch('https://mi-servicio.onrender.com/login', { // Cambia esto por la URL correcta de tu backend en Render
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const result = await response.json();

  if (response.ok) {
    window.location.href = 'admin.html'; // Redirige al admin
  } else {
    errorMessage.textContent = result.message;
  }
});
