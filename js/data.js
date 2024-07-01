export const contractAddress = '0x26d07FAb8A87936eC6D2E602ce79108816526048';

export const ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "vet",
				"type": "address"
			}
		],
		"name": "addAuthorizedVet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "petId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vaccineType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lotNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "administrationDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nextVaccinationDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dose",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vetLicense",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "clinicName",
				"type": "string"
			}
		],
		"name": "addVaccination",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ownerHash",
				"type": "bytes32"
			}
		],
		"name": "deleteOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "petId",
				"type": "string"
			}
		],
		"name": "deletePet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "petId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "deleteVaccination",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "species",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "breed",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sex",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "ownerHash",
				"type": "bytes32"
			}
		],
		"name": "registerPet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ownerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ownerDNI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ownerEmail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ownerPostalAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ownerPhoneNumber",
				"type": "string"
			}
		],
		"name": "registerPetOwner",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "vet",
				"type": "address"
			}
		],
		"name": "removeAuthorizedVet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newSpecies",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newBreed",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newDob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newSex",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newColor",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "_newOwnerHash",
				"type": "bytes32"
			}
		],
		"name": "updatePet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_ownerHash",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_newName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newDNI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newEmail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newPostalAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newPhoneNumber",
				"type": "string"
			}
		],
		"name": "updatePetOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_petId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_newVaccineType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newLotNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newAdministrationDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newNextVaccinationDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newDose",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newVetLicense",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_newClinicName",
				"type": "string"
			}
		],
		"name": "updateVaccination",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ownerHash",
				"type": "bytes32"
			}
		],
		"name": "getOwnerDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dni",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "postalAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "phoneNumber",
						"type": "string"
					}
				],
				"internalType": "struct PetVaccination.Owner",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ownerDNI",
				"type": "string"
			}
		],
		"name": "getOwnerHashByDNI",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "petId",
				"type": "string"
			}
		],
		"name": "getPetDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "species",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "breed",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sex",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "bytes32",
						"name": "ownerHash",
						"type": "bytes32"
					}
				],
				"internalType": "struct PetVaccination.Pet",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "ownerHash",
				"type": "bytes32"
			}
		],
		"name": "getPetIdsByOwnerHash",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "petId",
				"type": "string"
			}
		],
		"name": "getVaccinationHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "vaccineType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lotNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "administrationDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nextVaccinationDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dose",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "vetLicense",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "clinicName",
						"type": "string"
					}
				],
				"internalType": "struct PetVaccination.Vaccination[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "vet",
				"type": "address"
			}
		],
		"name": "isAuthorizedVet",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];