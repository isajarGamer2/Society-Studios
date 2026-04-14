// Función para crear un proxy que capture cookies de terceros
function createCookieProxy() {
  // Intercepta solicitudes fetch
  const originalFetch = window.fetch;
  
  window.fetch = function(...args) {
    // Obtener cookies antes de la solicitud
    const cookiesBefore = document.cookie;
    
    // Ejecutar la solicitud original
    return originalFetch.apply(this, args)
      .then(response => {
        // Obtener cookies después de la respuesta
        const cookiesAfter = document.cookie;
        
        // Comparar y registrar cambios
        if (cookiesBefore !== cookiesAfter) {
          const newCookies = findNewCookies(cookiesBefore, cookiesAfter);
          logThirdPartyCookies(newCookies);
        }
        
        return response;
      });
  };
}

// Función para encontrar cookies nuevas
function findNewCookies(before, after) {
  const beforeArray = before.split(';');
  const afterArray = after.split(';');
  
  return afterArray.filter(cookie => !beforeArray.includes(cookie));
}

// Función para registrar cookies de terceros
function logThirdPartyCookies(cookies) {
  cookies.forEach(cookie => {
    // Aquí puedes enviar las cookies a tu servidor
    console.log('Cookie de tercero detectada:', cookie);
  });
}

// Inicializar el proxy
createCookieProxy();
