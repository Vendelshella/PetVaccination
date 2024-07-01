import { ABI, contractAddress } from './data.js';
const { ethers } = window;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();


const contract = new ethers.Contract(contractAddress, ABI, signer);

async function updateOwner(ownerHash, newName, newDNI, newEmail, newPostalAddress, newPhoneNumber) {
    try {
        const tx = await contract.updatePetOwner(ownerHash, newName, newDNI, newEmail, newPostalAddress, newPhoneNumber);
        await tx.wait();
        alert("Propietario actualizado con éxito");
    } catch (error) {
        console.error(error);
        alert("Error actualizando propietario");
    }
}

async function updatePet(petId, newName, newSpecies, newBreed, newDob, newSex, newColor) {
    try {
        const tx = await contract.updatePet(petId, newName, newSpecies, newBreed, newDob, newSex, newColor);
        await tx.wait();
        alert("Mascota actualizada con éxito");
    } catch (error) {
        console.error(error);
        alert("Error actualizando mascota");
    }
}

async function updateVaccination(petId, index, newVaccineType, newLotNumber, newAdministrationDate, newNextVaccinationDate, newDose, newVetLicense, newClinicName) {
    try {
        const tx = await contract.updateVaccination(petId, index, newVaccineType, newLotNumber, newAdministrationDate, newNextVaccinationDate, newDose, newVetLicense, newClinicName);
        await tx.wait();
        alert("Vacuna actualizada con éxito");
    } catch (error) {
        console.error(error);
        alert("Error actualizando vacuna");
    }
}

document.getElementById("updateOwnerForm").addEventListener("click", async () => {
    const ownerHash = document.getElementById("ownerHash").value;
    const newName = document.getElementById("newName").value;
    const newDNI = document.getElementById("newDNI").value;
    const newEmail = document.getElementById("newEmail").value;
    const newPostalAddress = document.getElementById("newPostalAddress").value;
    const newPhoneNumber = document.getElementById("newPhoneNumber").value;
    await updateOwner(ownerHash, newName, newDNI, newEmail, newPostalAddress, newPhoneNumber);
});

document.getElementById("updatePetForm").addEventListener("click", async () => {
    const petId = document.getElementById("petId").value;
    const newName = document.getElementById("newPetName").value;
    const newSpecies = document.getElementById("newSpecies").value;
    const newBreed = document.getElementById("newBreed").value;
    const newDob = document.getElementById("newDob").value;
    const newSex = document.getElementById("newSex").value;
    const newColor = document.getElementById("newColor").value;
    await updatePet(petId, newName, newSpecies, newBreed, newDob, newSex, newColor);
});

document.getElementById("updateVaccinationForm").addEventListener("click", async () => {
    const petId = document.getElementById("petIdVaccination").value;
    const index = document.getElementById("vaccinationIndex").value;
    const newVaccineType = document.getElementById("newVaccineType").value;
    const newLotNumber = document.getElementById("newLotNumber").value;
    const newAdministrationDate = document.getElementById("newAdministrationDate").value;
    const newNextVaccinationDate = document.getElementById("newNextVaccinationDate").value;
    const newDose = document.getElementById("newDose").value;
    const newVetLicense = document.getElementById("newVetLicense").value;
    const newClinicName = document.getElementById("newClinicName").value;
    await updateVaccination(petId, index, newVaccineType, newLotNumber, newAdministrationDate, newNextVaccinationDate, newDose, newVetLicense, newClinicName);
});
