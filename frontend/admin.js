async function loadData(periodo) {
  const username = 'nombre_del_empleado'; // Cambia esto o implementa un sistema de autenticación real

  const response = await fetch(`https://mi-servidor.onrender.com/fichajes/${periodo}?username=${username}`, { // Reemplaza por la URL correcta
      method: 'GET'
  });
  const fichajes = await response.json();

  const tableBody = document.querySelector('#fichajes-table');
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
