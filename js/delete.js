import { ABI, contractAddress } from './data.js';
const { ethers } = window;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, ABI, signer);

async function deleteOwner(ownerHash) {
    if (confirm("Antes de eliminar definitivamente el antiguo dueño de la mascota, asegurate de registrar al nuevo dueño de la mascota, luego obtener su hash y vincularlo con la mascota actualizando los datos de la misma. Los hashes son importantes para consultar los datos de las mascotas. ¿Estás seguro de que quieres borrarlo?")){
        try {
            const tx = await contract.deleteOwner(ownerHash);
            await tx.wait();
            alert("Propietario borrado con éxito");
        } catch (error) {
            console.error(error);
            alert("Error borrando propietario");
        }
    }
}

async function deletePet(petId) {
    if (confirm("Si eliminas esta mascota, se eliminarán sus vacunas. ¿Estás seguro?")) {
        try {
            const tx = await contract.deletePet(petId);
            await tx.wait();
            alert("Mascota borrada con éxito");
        } catch (error) {
            console.error(error);
            alert("Error borrando mascota");
        }
    }
}

async function deleteVaccination(petId, index) {
    try {
        const tx = await contract.deleteVaccination(petId, index);
        await tx.wait();
        alert("Vacuna borrada con éxito");
    } catch (error) {
        console.error(error);
        alert("Error borrando vacuna");
    }
}

document.getElementById("deleteOwnerForm").addEventListener("click", async () => {
    const ownerHash = document.getElementById("ownerHash").value;
    await deleteOwner(ownerHash);
});

document.getElementById("deletePetForm").addEventListener("click", async () => {
    const petId = document.getElementById("petId").value;
    await deletePet(petId);
});

document.getElementById("deleteVaccinationForm").addEventListener("click", async () => {
    const petId = document.getElementById("petIdVaccination").value;
    const index = document.getElementById("vaccinationIndex").value;
    await deleteVaccination(petId, index);
});
