console.log('Conexion exitosa');

// REFERENCIAS DEL DOM
const destinationContainer = document.querySelector('#destinations-container');
const resultsCount = document.querySelector('#results-count');

// INICIALIZACIÓN DE LA APLICACIÓN
function init() {
  console.log('Explorador de viajes iniciado');
  resultsCount.textContent = '1 destino';
}

// INICIAR APLICACIÓN
init();