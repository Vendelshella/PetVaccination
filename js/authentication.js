// Verificar el estado de autenticación al cargar la página
window.onload = function autentication () {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
        // Redirigir a login.html si no está autenticado
        window.location.href = 'login.html';
    }
}