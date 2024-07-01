# PetVaccination DApp Interface

This documentation explains how to use the HTML, CSS, and JavaScript interface developed to interact with the `PetVaccination` smart contract using the ethers.js library. The interface enables users to perform actions such as registering pet owners and pets, adding vaccination records, and retrieving data.

## Prerequisites

- **Remix IDE**: An online integrated development environment for Ethereum smart contracts.
- **Metamask**: A browser extension that allows you to interact with the Ethereum blockchain.
- **Testnet**: A testing network for Ethereum where you can deploy and test your smart contracts without using real ETH.

## Setting Up

1. **Deploy the Contract on Remix IDE**:
   - Open the [Remix IDE](https://remix.ethereum.org/).
   - Copy the `PetVaccination` smart contract code into a new Solidity file in Remix.
   - Compile the contract using the Solidity compiler.
   - Deploy the contract on a testnet like Ropsten or Rinkeby using the "Deploy & Run Transactions" tab.

2. **Configure Metamask**:
   - Install the [Metamask](https://metamask.io/) browser extension.
   - Create or import a wallet.
   - Connect Metamask to the same testnet you used to deploy the contract.
   - Acquire some testnet ETH from a faucet (e.g., [Ropsten Faucet](https://faucet.ropsten.be/)).

3. **Set Up the Interface**:
   - Clone or download the repository containing the HTML, CSS, and JavaScript files.
   - Open the `index.html` file in a web browser.
   - Ensure that you have the `ethers.js` library included in your project. You can add it via a CDN in your HTML file:
     ```html
     <script src="https://cdn.jsdelivr.net/npm/ethers@5.4.6/dist/ethers.min.js" integrity="your-hash"></script>
     ```
   - Get hash integrity: https://www.srihash.org.

## Using the Interface

1. **Connect to Metamask**:
   - The interface will prompt you to connect to Metamask.
   - Approve the connection request in the Metamask popup.

2. **Interact with the Smart Contract**:
   - The interface provides several functions to interact with the `PetVaccination` contract:
     - **Register Pet Owner**: Input owner details and register a new owner.
     - **Register Pet**: Input pet details and register a new pet.
     - **Add Vaccination**: Add a new vaccination record for a registered pet.
     - **View Data**: Retrieve and display pet and owner details, as well as vaccination histories.

3. **Functions Implementation**:
   - The JavaScript files use the `ethers.js` library to connect to the Ethereum blockchain and interact with the smart contract.
        
## Contract Configuration

- The file `data.js` contains the contract address and ABI information. By updating this file, you can easily configure the interface to interact with different deployments of the `PetVaccination` contract.

  This allows for easy updates and modifications without changing the core logic of your JavaScript functions.

## Testing and Deployment

- **Test on Testnet**: Use testnets like Ropsten or Rinkeby to test the full functionality of your DApp without spending real ETH.
- **Deploy to Mainnet**: Once satisfied with the testnet results, you can deploy your contract to the Ethereum mainnet. Update the contract address and network settings in your JavaScript files to point to the mainnet.

## Conclusion

This interface, combined with the `PetVaccination` smart contract, provides a robust solution for managing pet vaccination records on the Ethereum blockchain. By leveraging ethers.js and Metamask, users can securely interact with the blockchain to perform various operations related to pet health management.
