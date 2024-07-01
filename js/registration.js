import { ABI, contractAddress } from './data.js';

const { ethers } = window;

// Función para registrar al dueño
async function registerPetOwner(contract, ownerName, ownerDNI, ownerEmail, ownerPostalAddress, ownerPhoneNumber) {
    try {
        // Conectar con MetaMask y obtener el signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Conectar al contrato con el signer (necesario para las transacciones)
        const contractWithSigner = contract.connect(signer);
        // Llamar a la función registerPetOwner del contrato
        const tx = await contractWithSigner.registerPetOwner(ownerName, ownerDNI, ownerEmail, ownerPostalAddress, ownerPhoneNumber);
        
        // Esperar a que la transacción se confirme
        await tx.wait();

        console.log('Propietario registrado con éxito');
        alert('Propietario registrado con éxito');
    } catch (error) {
        console.error('Error al registrar el propietario:', error);
        alert('Error al registrar el propietario: ' + error.reason);
    }
}

// Asociar la función registerPetOwner al evento click del botón
document.getElementById('registerOwnerButton').addEventListener('click', async () => {
    // Obtener los valores del formulario
    const ownerName = document.getElementById('ownerName').value;
    const ownerDNI = document.getElementById('ownerDNI').value;
    const ownerEmail = document.getElementById('ownerEmail').value;
    const ownerPostalAddress = document.getElementById('ownerPostalAddress').value;
    const ownerPhoneNumber = document.getElementById('ownerPhoneNumber').value;

    // Crear una instancia del contrato
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, ABI, provider);

    // Llamar a la función para registrar al dueño
    await registerPetOwner(contract, ownerName, ownerDNI, ownerEmail, ownerPostalAddress, ownerPhoneNumber);
});


// Función para registrar a la mascota
async function registerPet(contract, id, name, species, breed, dob, sex, color, ownerHash) {
    try {
        // Conectar con MetaMask y obtener el signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Conectar al contrato con el signer (necesario para las transacciones)
        const contractWithSigner = contract.connect(signer);
        // Llamar a la función registerPetOwner del contrato
        const tx = await contractWithSigner.registerPet(id, name, species, breed, dob, sex, color, ownerHash);
        
        // Esperar a que la transacción se confirme
        await tx.wait();

        console.log('Mascota registrada con éxito');
        alert('Mascota registrada con éxito');
    } catch (error) {
        console.error('Error al registrar la mascota:', error);
        alert('Error al registrar la mascota ' + error.reason);
    }
}

// Asociar la función registerPet al evento click del botón
document.getElementById('registerPetButton').addEventListener('click', async () => {
    // Obtener los valores del formulario
    const id = document.getElementById('petId').value;
    const name = document.getElementById('petName').value;
    const species = document.getElementById('petSpecies').value;
    const breed = document.getElementById('petBreed').value;
    const dob = document.getElementById('petDob').value;
    const sex = document.getElementById('petSex').value;
    const color = document.getElementById('petColor').value;
    const ownerHash = document.getElementById('ownerHash').value;

    // Crear una instancia del contrato
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, ABI, provider);

    // Llamar a la función para registrar a la mascota
    await registerPet(contract, id, name, species, breed, dob, sex, color, ownerHash);
});

// Función para añadir vacunación
async function addVaccination(contract, petId, vaccineType, lotNumber, administrationDate, nextVaccinationDate, dose, vetLicense, clinicName) {
    try {
        // Conectar con MetaMask y obtener el signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Conectar al contrato con el signer (necesario para las transacciones)
        const contractWithSigner = contract.connect(signer);
        // Llamar a la función addVaccination del contrato
        const tx = await contractWithSigner.addVaccination(petId, vaccineType, lotNumber, administrationDate, nextVaccinationDate, dose, vetLicense, clinicName);
        
        // Esperar a que la transacción se confirme
        await tx.wait();

        console.log('Vacuna registrada con éxito');
        alert('Vacuna registrada con éxito');
    } catch (error) {
        console.error('Error al registrar la vacuna:', error);
        alert('Error al registrar la vacuna ' + error.reason);
    }
}

// Asociar la función addVaccination al evento click del botón
document.getElementById('addVaccinationButton').addEventListener('click', async () => {
    // Obtener los valores del formulario
    const petId = document.getElementById('vaccinationPetId').value;
    const vaccineType = document.getElementById('vaccineType').value;
    const lotNumber = document.getElementById('lotNumber').value;
    const administrationDate = document.getElementById('administrationDate').value;
    const nextVaccinationDate = document.getElementById('nextVaccinationDate').value;
    const dose = document.getElementById('dose').value;
    const vetLicense = document.getElementById('vetLicense').value;
    const clinicName = document.getElementById('clinicName').value;

    // Crear una instancia del contrato
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, ABI, provider);

    // Llamar a la función para añadir la vacuna
    await addVaccination(contract, petId, vaccineType, lotNumber, administrationDate, nextVaccinationDate, dose, vetLicense, clinicName);
});


//*************************************//
/*
Proveedor y Signer
Proveedor (Provider): Un proveedor es una conexión de solo lectura a la blockchain.
Signer: Un signer, por otro lado, es una conexión que tiene acceso a una clave privada y puede firmar transacciones.
*/