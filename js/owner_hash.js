import { ABI, contractAddress } from './data.js';
const { ethers } = window;

// Función para obtener el ownerHash por DNI
async function getOwnerHashByDNI(signer, contract, ownerDNI) {
    try {
        // Crear una instancia del contrato con el signer
        const contractWithSigner = contract.connect(signer);

        // Llamar a la función getOwnerHashByDNI del contrato
        const ownerHash = await contractWithSigner.getOwnerHashByDNI(ownerDNI);
        
        console.log('Hash del propietario:', ownerHash);

        // Mostrar el ownerHash en el div
        document.getElementById('result').innerText = ownerHash;
        
        return ownerHash;
        
    } catch (error) {
        console.error('Error al obtener el hash del propietario:', error);
        // Mostrar el error en el div
        document.getElementById('result').innerText = 'Error al obtener el hash del propietario: ' + error.reason;
        throw error;
    }
}

// Asegurar que el contenido DOM esté cargado antes de agregar event listeners
document.addEventListener('DOMContentLoaded', async () => {
    // Verificar si MetaMask está instalado
    if (!window.ethereum) {
        alert("Por favor, instala MetaMask para usar esta aplicación.");
        return;
    }

    // Configurar MetaMask provider y obtener el signer
    const ethereumProvider = window.ethereum;
    await ethereumProvider.request({ method: 'eth_requestAccounts' }); // Solicitar acceso a las cuentas de MetaMask
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const signer = provider.getSigner(); // Obtener el signer

    // Crear una instancia del contrato
    const contract = new ethers.Contract(contractAddress, ABI, provider);

    // Asociar la función getOwnerHashByDNI al evento click del botón
    document.getElementById('dniButton').addEventListener('click', async () => {
        // Obtener los valores del formulario
        const ownerDNI = document.getElementById('dni').value;

        // Llamar a la función para ver el ownerHash
        await getOwnerHashByDNI(signer, contract, ownerDNI);
    });
});
