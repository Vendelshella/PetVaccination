import { ABI, contractAddress } from './data.js';

const { ethers } = window;

async function getOwnerDetails(ownerHash) {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        const owner = await contract.getOwnerDetails(ownerHash);
        return owner;
    } catch (error) {
        console.error('Error al obtener los detalles del propietario:', error.reason);
    }
}

document.getElementById('getOwnerDetailsButton').addEventListener('click', async () => {
    const ownerHash = document.getElementById('ownerHash').value;

    try {
        const owner = await getOwnerDetails(ownerHash);
        console.log(owner);
        displayOwnerDetails(owner);
    } catch (error) {
        alert(error.message);
    }
});

function displayOwnerDetails(owner) {
    const ownerDetailsContainer = document.getElementById('ownerDetails');
    ownerDetailsContainer.innerHTML = `
        <p><strong>Nombre:</strong> ${owner.name}</p>
        <p><strong>DNI:</strong> ${owner.dni}</p>
        <p><strong>Email:</strong> ${owner.email}</p>
        <p><strong>Dirección Postal:</strong> ${owner.postalAddress}</p>
        <p><strong>Número de Teléfono:</strong> ${owner.phoneNumber}</p>
    `;
}
