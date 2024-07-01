import { ABI, contractAddress } from './data.js';

const { ethers } = window;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, ABI, signer);

async function getVaccinationHistory(petId) {
    try {
        const vaccination = await contract.getVaccinationHistory(petId);
        console.log('Vaccination history retrieved:', vaccination);
        return vaccination;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener la información de la vacuna: " + error.reason);
    }
}

document.getElementById("getVaccinationHistoryForm").addEventListener("click", async () => {

    const petId = document.getElementById("petId").value;

    try {
        const vaccination = await getVaccinationHistory(petId);
        displayVaccination(vaccination);
    } catch (error) {
        alert(error.reason);
    }
});

function displayVaccination(vaccination) {
    
    let resultContainer = document.getElementById("vaccinationResult");
    resultContainer.innerHTML = "";

    if (!vaccination[0]) {
        resultContainer.innerHTML = "<p>No se encontró información de vacunación para esta mascota.</p>";
        return;
    } else {
        vaccination = vaccination[0];
        console.log(vaccination.length);

            for (let i = 0; i < vaccination.length; i++) {
                if (vaccination[i].vaccineType.trim() !== "") {
                    resultContainer.innerHTML += `<h3>Num vacuna (índice): ${i+1}</h3>`;
                    resultContainer.innerHTML += `
                    <p><strong>Vacuna:</strong> ${vaccination[i].vaccineType}</p>
                    <p><strong>Num lote:</strong> ${vaccination[i].lotNumber}</p>
                    <p><strong>Fecha de administración:</strong> ${vaccination[i].administrationDate}</p>
                    <p><strong>Siguiente fecha de vacunación:</strong> ${vaccination[i].nextVaccinationDate}</p>
                    <p><strong>Dosis:</strong> ${vaccination[i].dose}</p>
                    <p><strong>Licencia del veterinario:</strong> ${vaccination[i].vetLicense}</p>
                    <p><strong>Nombre de la clínica:</strong> ${vaccination[i].clinicName}</p>
                    <br>`;
                }
            }
         
    }
}
