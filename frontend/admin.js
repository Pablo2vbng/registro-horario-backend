// URL de la API en Render
const API_URL = 'https://registro-horario-backend.onrender.com';

// Función para cargar los registros
const cargarRegistros = async (endpoint) => {
  try {
    const response = await fetch(API_URL + endpoint);
    const data = await response.json();

    if (data.success) {
      mostrarRegistros(data.registros);
    } else {
      alert('No se pudieron obtener los registros');
    }
  } catch (error) {
    console.error('Error al cargar los registros:', error);
  }
};

// Función para mostrar los registros en la tabla
const mostrarRegistros = (registros) => {
  const tableBody = document.querySelector('#registrosTable tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla antes de insertar nuevos registros

  registros.forEach((registro) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${registro.usuario}</td>
      <td>${new Date(registro.fecha_entrada).toLocaleString()}</td>
      <td>${registro.fecha_salida ? new Date(registro.fecha_salida).toLocaleString() : 'No registrada'}</td>
    `;
    tableBody.appendChild(row);
  });
};

// Event listeners para los botones
document.getElementById('diaButton').addEventListener('click', () => {
  cargarRegistros('/registros/dia');
});
document.getElementById('semanaButton').addEventListener('click', () => {
  cargarRegistros('/registros/semana');
});
document.getElementById('mesButton').addEventListener('click', () => {
  cargarRegistros('/registros/mes');
});
