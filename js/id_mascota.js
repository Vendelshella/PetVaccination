import { ABI, contractAddress } from './data.js';
const { ethers } = window;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, ABI, signer);

document.getElementById('getPetIdsForm').addEventListener('click', async function() {

    const ownerHash = document.getElementById('ownerHash').value;

    try {
        const petIds = await getPetIdsByOwnerHash(ownerHash);
        displayPetIds(petIds);
    } catch (error) {
        console.error('Error al obtener los IDs de las mascotas: ', error.reason);
        alert('Error al obtener los IDs de las mascotas');
    }
});

async function getPetIdsByOwnerHash(ownerHash) {
    try {
        // Lógica para interactuar con el contrato y obtener los IDs de las mascotas
        const petIds = await contract.getPetIdsByOwnerHash(ownerHash);
        console.log('Pet IDs retrieved:', petIds);
        return petIds;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los IDs de las mascotas ', error.reason);
    }
}

function displayPetIds(petIds) {
    const petIdsList = document.getElementById('petIdsList');
    petIdsList.innerHTML = '';

    if (petIds.length === 0) {
        petIdsList.appendChild("No se encontraron mascotas.");
    } else {
        petIds.forEach(petId => {
            const li = document.createElement('li');
            li.textContent = petId;
            petIdsList.appendChild(li);
        });
    }
    
}
