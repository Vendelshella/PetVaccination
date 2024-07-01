// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PetVaccination {
    struct Owner {
        string name;
        string dni;
        string email;
        string postalAddress;
        string phoneNumber;
    }

    struct Pet {
        string id;
        string name;
        string species;
        string breed;
        string dob;
        string sex;
        string color;
        bytes32 ownerHash;
    }

    struct Vaccination {
        string vaccineType;
        string lotNumber;
        string administrationDate;
        string nextVaccinationDate;
        string dose;
        string vetLicense;
        string clinicName;
    }

    address private contractOwner;
    mapping(address => bool) private authorizedVets;
    mapping(string => Pet) private pets;
    mapping(string => Vaccination[]) private vaccinations;
    mapping(string => mapping(bytes32 => bool)) private petOwnerHash;
    mapping(bytes32 => Owner) private owners;
    mapping(string => bytes32) private dniToOwnerHash;
    string[] private petIds; // Array to keep track of all pet IDs

    modifier onlyContractOwner() {
        require(msg.sender == contractOwner, "Only contract owner can perform this action");
        _;
    }

    modifier onlyAuthorizedVet() {
        require(authorizedVets[msg.sender], "Only authorized vets can perform this action");
        _;
    }

    constructor() {
        contractOwner = msg.sender;
    }

    /* CONSTRACT OWNER FUNCTIONS */

    function addAuthorizedVet(address vet) public onlyContractOwner {
        authorizedVets[vet] = true;
    }

    function removeAuthorizedVet(address vet) public onlyContractOwner {
        authorizedVets[vet] = false;
    }

    function isAuthorizedVet(address vet) public view returns (bool) {
        return authorizedVets[vet];
    }

    /* CREATE FUNCTIONS */

    function calculateOwnerHash(
        string memory ownerName,
        string memory ownerDNI,
        string memory ownerEmail,
        string memory ownerPostalAddress,
        string memory ownerPhoneNumber
    ) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(ownerName, ownerDNI, ownerEmail, ownerPostalAddress, ownerPhoneNumber));
    }

    function registerPetOwner(
        string memory ownerName,
        string memory ownerDNI,
        string memory ownerEmail,
        string memory ownerPostalAddress,
        string memory ownerPhoneNumber
    ) public onlyAuthorizedVet returns (bytes32) {
        bytes32 ownerHash = calculateOwnerHash(ownerName, ownerDNI, ownerEmail, ownerPostalAddress, ownerPhoneNumber);
        require(bytes(owners[ownerHash].name).length == 0, "Owner already registered");
        owners[ownerHash] = Owner(ownerName, ownerDNI, ownerEmail, ownerPostalAddress, ownerPhoneNumber);
        dniToOwnerHash[ownerDNI] = ownerHash; // Actualizar mapeo de DNI a ownerHash
        return ownerHash;
    }

    function registerPet(
        string memory id,
        string memory name,
        string memory species,
        string memory breed,
        string memory dob,
        string memory sex,
        string memory color,
        bytes32 ownerHash
    ) public onlyAuthorizedVet {
        require(bytes(pets[id].id).length == 0, "Pet already registered");
        pets[id] = Pet(id, name, species, breed, dob, sex, color, ownerHash);
        petOwnerHash[id][ownerHash] = true;
        petIds.push(id); // Add the pet ID to the list
    }

    function addVaccination(
        string memory petId,
        string memory vaccineType,
        string memory lotNumber,
        string memory administrationDate,
        string memory nextVaccinationDate,
        string memory dose,
        string memory vetLicense,
        string memory clinicName
    ) public onlyAuthorizedVet {
        require(bytes(pets[petId].id).length != 0, "Pet not registered");

        // Check if the vaccination already exists
        uint256 length = vaccinations[petId].length;
        
        for (uint256 i = 0; i < length; i++) {
            Vaccination storage existingVaccination = vaccinations[petId][i];
            if (keccak256(abi.encodePacked(
                existingVaccination.vaccineType,
                existingVaccination.lotNumber,
                existingVaccination.administrationDate,
                existingVaccination.nextVaccinationDate,
                existingVaccination.dose,
                existingVaccination.vetLicense,
                existingVaccination.clinicName
            )) == keccak256(abi.encodePacked(
                vaccineType,
                lotNumber,
                administrationDate,
                nextVaccinationDate,
                dose,
                vetLicense,
                clinicName
            ))) {
                revert("Vaccination already exists");
            }
        }

        vaccinations[petId].push(Vaccination(
            vaccineType, lotNumber, administrationDate, nextVaccinationDate, dose, vetLicense, clinicName
        ));
    }

    /* READ FUNCTIONS */

    function getVaccinationHistory(string memory petId) public view onlyAuthorizedVet returns (Vaccination[] memory, uint256[] memory) {
        require(bytes(pets[petId].id).length != 0, "Pet not registered");
        uint256 length = vaccinations[petId].length;
        Vaccination[] memory vaccinationList = new Vaccination[](length);
        uint256[] memory indexes = new uint256[](length);
        for (uint256 i = 0; i < length; i++) {
            vaccinationList[i] = vaccinations[petId][i];
            indexes[i] = i;
        }
        return (vaccinationList, indexes);
    }

    function getPetDetails(string memory petId) public view onlyAuthorizedVet returns (Pet memory) {
        require(bytes(pets[petId].id).length != 0, "Pet not registered");
        return pets[petId];
    }

    function getPetIdsByOwnerHash(bytes32 ownerHash) public view onlyAuthorizedVet returns (string[] memory) {
        uint256 count = 0;

        // First count the number of pets for the owner
        for (uint256 i = 0; i < petIds.length; i++) {
            if (petOwnerHash[petIds[i]][ownerHash]) {
                count++;
            }
        }

        // Create an array of the appropriate size
        string[] memory result = new string[](count);
        uint256 index = 0;

        // Populate the array with the pet IDs
        for (uint256 i = 0; i < petIds.length; i++) {
            if (petOwnerHash[petIds[i]][ownerHash]) {
                result[index] = petIds[i];
                index++;
            }
        }

        return result;
    }

    function getOwnerDetails(bytes32 ownerHash) public view onlyAuthorizedVet returns (Owner memory) {
        require(bytes(owners[ownerHash].name).length != 0, "Owner not registered");
        return owners[ownerHash];
    }

    function getOwnerHashByDNI(string memory ownerDNI) public view onlyAuthorizedVet returns (bytes32) {
        require(dniToOwnerHash[ownerDNI] != 0, "Owner not found");
        return dniToOwnerHash[ownerDNI];
    }

    /* UPDATE FUNCTIONS */

    function updatePetOwner(
    bytes32 _ownerHash,
    string memory _newName,
    string memory _newDNI,
    string memory _newEmail,
    string memory _newPostalAddress,
    string memory _newPhoneNumber
    ) public onlyAuthorizedVet {
        require(bytes(owners[_ownerHash].name).length != 0, "Owner not found");
        Owner storage owner = owners[_ownerHash];

        if (bytes(_newName).length > 0) {
            owner.name = _newName;
        }
        if (bytes(_newDNI).length > 0) {
            owner.dni = _newDNI;
        }
        if (bytes(_newEmail).length > 0) {
            owner.email = _newEmail;
        }
        if (bytes(_newPostalAddress).length > 0) {
            owner.postalAddress = _newPostalAddress;
        }
        if (bytes(_newPhoneNumber).length > 0) {
            owner.phoneNumber = _newPhoneNumber;
        }
    }

    function updatePet(
        string memory _id,
        string memory _newName,
        string memory _newSpecies,
        string memory _newBreed,
        string memory _newDob,
        string memory _newSex,
        string memory _newColor,
        bytes32 _newOwnerHash
    ) public onlyAuthorizedVet {
        require(bytes(pets[_id].id).length != 0, "Pet not found");
        Pet storage pet = pets[_id];
        if (bytes(_newName).length > 0) {
            pet.name = _newName;
        }
        if (bytes(_newSpecies).length > 0) {
            pet.species = _newSpecies;
        }
        if (bytes(_newBreed).length > 0) {
            pet.breed = _newBreed;
        }
        if (bytes(_newDob).length > 0) {
            pet.dob = _newDob;
        }
        if (bytes(_newSex).length > 0) {
            pet.sex = _newSex;
        }
        if (bytes(_newColor).length > 0) {
            pet.color = _newColor;
        }
        if (bytes32(_newOwnerHash).length > 0) {
            pet.ownerHash = _newOwnerHash;
        }
    }

    function updateVaccination(
        string memory _petId,
        uint256 _index,
        string memory _newVaccineType,
        string memory _newLotNumber,
        string memory _newAdministrationDate,
        string memory _newNextVaccinationDate,
        string memory _newDose,
        string memory _newVetLicense,
        string memory _newClinicName
    ) public onlyAuthorizedVet {
        require(bytes(pets[_petId].id).length != 0, "Pet not found");
        require(_index < vaccinations[_petId].length, "Invalid vaccination index");
        Vaccination storage vaccination = vaccinations[_petId][_index];

        if (bytes(_newVaccineType).length > 0) {
            vaccination.vaccineType = _newVaccineType;
        }
        if (bytes(_newLotNumber).length > 0) {
            vaccination.lotNumber = _newLotNumber;
        }
        if (bytes(_newAdministrationDate).length > 0) {
            vaccination.administrationDate = _newAdministrationDate;
        }
        if (bytes(_newNextVaccinationDate).length > 0) {
            vaccination.nextVaccinationDate = _newNextVaccinationDate;
        }
        if (bytes(_newDose).length > 0) {
            vaccination.dose = _newDose;
        }
        if (bytes(_newVetLicense).length > 0) {
            vaccination.vetLicense = _newVetLicense;
        }
        if (bytes(_newClinicName).length > 0) {
            vaccination.clinicName = _newClinicName;
        }
    }

    /* DELETE FUNCTIONS */

    function deletePet(string memory petId) public onlyAuthorizedVet {
        require(bytes(pets[petId].id).length != 0, "Pet not found");
        delete pets[petId];
        delete vaccinations[petId];
        // También es posible eliminar referencias relacionadas como:
        // delete petOwnerHash[petId];
        // Se deben manejar dependencias y cascadas de borrado según sea necesario

        // Find and remove petId from petIds array
        for (uint256 i = 0; i < petIds.length; i++) {
            if (keccak256(abi.encodePacked(petIds[i])) == keccak256(abi.encodePacked(petId))) {
                petIds[i] = petIds[petIds.length - 1];
                petIds.pop();
                break;
            }
        }
    }

    function deleteOwner(bytes32 ownerHash) public onlyAuthorizedVet {
        require(bytes(owners[ownerHash].name).length != 0, "Owner not found");
        
        // Get the ownerDNI before delete
        string memory ownerDNI = owners[ownerHash].dni;

        // Remove the mapping from DNI to ownerHash
        delete dniToOwnerHash[ownerDNI];
        
        // Delete owner
        delete owners[ownerHash];
    }

    function deleteVaccination(string memory petId, uint256 index) public onlyAuthorizedVet {
        require(bytes(pets[petId].id).length != 0, "Pet not found");
        require(index < vaccinations[petId].length, "Invalid vaccination index");
        delete vaccinations[petId][index];
        // Asegúrate de manejar la estructura de datos para eliminar y reorganizar según sea necesario
    }

}
