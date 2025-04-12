async function loadData(periodo) {
  const username = 'nombre_del_empleado'; // Cambia esto o implementa un sistema de autenticación real
  
  // Asegúrate de que esta URL sea la de tu servicio en Render
  const response = await fetch(`https://mi-servicio.onrender.com/fichajes/${periodo}?username=${username}`, {  // Cambia esto por la URL correcta
    method: 'GET'
  });

  const fichajes = await response.json();

  const tableBody = document.querySelector('#fichajes-table tbody');
  tableBody.innerHTML = '';

  fichajes.forEach(fichaje => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${fichaje.username}</td>
      <td>${fichaje.action}</td>
      <td>${fichaje.fecha_hora}</td>
    `;
    tableBody.appendChild(row);
  });
}
