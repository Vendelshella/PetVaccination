import { ABI, contractAddress } from './data.js';
document.addEventListener('DOMContentLoaded', async () => {
    const { ethers } = window;
    
    // Configurar MetaMask provider
    const ethereumProvider = window.ethereum;

    // Verificar si MetaMask está instalado
    if (!ethereumProvider) {
        alert("Por favor instala MetaMask para usar esta aplicación.");
    }

    // Función para conectar con MetaMask y solicitar acceso a cuentas
    async function connectWithMetaMask() {
        try {
            // Solicitar acceso a las cuentas de MetaMask
            const accounts = await ethereumProvider.request({ method: 'eth_requestAccounts' });

            if (!accounts || accounts.length === 0) {
                alert("No se encontraron cuentas en MetaMask. Por favor, asegúrate de estar conectado.");
                return null;
            } else {
                // Mostrar la dirección del usuario en el div especificado
                const metamaskAddressDiv = document.getElementById('metamask-address');
                metamaskAddressDiv.innerText = accounts[0];

                return accounts[0]; // Devolver la primera cuenta conectada
            }
            
        } catch (error) {
            console.error('Error al conectar con MetaMask:', error);
            throw error;
        }
    }

    await connectWithMetaMask();

    // Función para verificar si una dirección está autorizada como veterinario
    async function checkAuthorization(userAddress, contract) {
        try {
            // Llamar a la función del contrato para verificar autorización
            const isAuthorized = await contract.isAuthorizedVet(userAddress);
            return isAuthorized;
        } catch (error) {
            console.error('Error al verificar la autorización:', error);
            throw error;
        }
    }

    // Función para manejar el login basado en la autorización
    async function handleLogin() {
        try {
            // Conectar con MetaMask y obtener la dirección del usuario
            const userAddress = await connectWithMetaMask();

            // Crear una instancia del contrato
            const provider = new ethers.providers.Web3Provider(ethereumProvider);
            const contract = new ethers.Contract(contractAddress, ABI, provider);

            // Verificar la autorización del usuario
            const isAuthorized = await checkAuthorization(userAddress, contract);

            // Manejar el resultado de la autorización
            if (isAuthorized) {
                window.location.href = 'dashboard.html';
                
                // Almacenar estado de autenticación en localStorage
                localStorage.setItem('isAuthenticated', 'true');

            } else {
                alert("Lo siento, no estás autorizado como veterinario.");
            }
        } catch (error) {
            // Manejar errores generales
            console.error('Error al manejar el login:', error);
            // Aquí puedes manejar los errores específicos que puedas anticipar
        }
    }

    // Ejemplo de cómo iniciar el proceso de login (puede estar vinculado a un botón en tu interfaz de usuario)
    document.getElementById('loginButton').addEventListener('click', handleLogin);
})