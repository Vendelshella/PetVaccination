import { ABI, contractAddress } from './data.js';

const { ethers } = window;

async function getPetDetails(petId) {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        const pet = await contract.getPetDetails(petId);
        return pet;
    } catch (error) {
        console.error('Error al obtener los detalles de la mascota:', error.reason);
    }
}

document.getElementById('getPetDetailsButton').addEventListener('click', async () => {
    const petId = document.getElementById('petId').value;

    try {
        const pet = await getPetDetails(petId);
        console.log(pet);
        displayPetDetails(pet);
    } catch (error) {
        alert(error.message);
    }
});

function displayPetDetails(pet) {
    const petDetailsContainer = document.getElementById('petDetails');
    petDetailsContainer.innerHTML = `
        <p><strong>ID:</strong> ${pet.id}</p>
        <p><strong>Nombre:</strong> ${pet.name}</p>
        <p><strong>Especie:</strong> ${pet.species}</p>
        <p><strong>Raza:</strong> ${pet.breed}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${pet.dob}</p>
        <p><strong>Sexo:</strong> ${pet.sex}</p>
        <p><strong>Color:</strong> ${pet.color}</p>
        <p><strong>Hash del Propietario:</strong> ${pet.ownerHash}</p>
    `;
}
