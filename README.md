# NFT Ticketing Platform for College Fest

## Introduction

This project is a decentralized NFT-based ticketing platform for a college fest. It allows event organizers to create events, set ticket prices, and manage ticket sales securely on the blockchain. Users can purchase, transfer, and use their tickets, which are represented as non-fungible tokens (NFTs). The platform ensures that each ticket is unique and verifiable, reducing the risk of counterfeit tickets.

## Features

- **Admin Dashboard**: 
  - Create and manage events.
  - Set ticket prices, availability, and additional information.
  - Upload NFTs for events.

- **User Dashboard**:
  - View available events and purchase tickets.
  - Transfer purchased tickets to other users.
  - Verify tickets at the event venue using a QR code scanner, marking the ticket as used.

- **Security**:
  - Tickets are represented as NFTs on the blockchain, ensuring authenticity and preventing counterfeiting.
  - Once a ticket is verified and used, it cannot be reused.

## Technology Stack

- **Frontend**: React.js, Tailwind CSS
- **Blockchain**: Solidity, Ethereum
- **Smart Contract Deployment**: Hardhat
- **Wallet Connection**: Ethers.js, Web3Modal

## Installation

To run the project locally, follow these steps:

 **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/nft-ticketing-platform.git
   cd nft-ticketing-platform
