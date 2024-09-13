import { ethers } from 'ethers'; 
import Web3Modal from 'web3modal';
import TicketNFT from './TicketNFT.json'; 

const TICKET_NFT_ADDRESS = '0x3D9704d10EAf303f1584C7c12Cf8d6a7DfEFDa2A'; 

let provider;
let signer;
let contract;

export const connectWallet = async () => {
  try {
    const web3Modal = new Web3Modal();
    const instance = await web3Modal.connect();
    provider = new ethers.BrowserProvider(instance); 
    signer = await provider.getSigner();
    try {
      contract = new ethers.Contract(TICKET_NFT_ADDRESS, TicketNFT, signer);
    } catch (error) {
      console.error("Error initializing contract:", error);
      // Display an appropriate error message to the user
    }    
    const address = await signer.getAddress();
    console.log('Wallet connected:', address);
    return address;
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    throw error;
  }
};


// Removed getContract function, as it is redundant

export const createEvent = async (organization, teamName, eventName, description, venue, date, time, maxTickets) => {
  if (!contract) throw new Error("Contract is not initialized"); // This check ensures contract is initialized
  try {
    const maxTicketsInt = parseInt(maxTickets, 10); // Ensure maxTickets is an integer
    if (isNaN(maxTicketsInt)) throw new Error("Invalid number for max tickets");

    const tx = await contract.createEvent(organization, teamName, eventName, description, venue, date, time, maxTicketsInt);
    await tx.wait(); // Wait for the transaction to be mined
    console.log('Event created successfully:', tx);
  } catch (error) {
    console.error("Failed to create event:", error);
    throw error;
  }
};
export const buyTicket = async (eventId, ticketURI) => {
  if (!contract) throw new Error("Contract is not initialized");
  try {
    const tx = await contract.mintTicket(eventId, ticketURI); // Call mintTicket with eventId and ticketURI
    await tx.wait(); // Wait for the transaction to be confirmed
    
    console.log('Ticket minted successfully:', tx);
  } catch (error) {
    console.error("Failed to mint ticket:", error);
    throw error;
  }
};
export const validateTicket = async (tokenId) => {
  if (!contract) throw new Error("Contract is not initialized");
  try {
    return await contract.validateTicket(tokenId);
  } catch (error) {
    console.error("Failed to validate ticket:", error);
    throw error;
  }
};

export const markTicketAsUsed = async (tokenId) => {
  if (!contract) throw new Error("Contract is not initialized");
  try {
    const tx = await contract.markTicketAsUsed(tokenId);
    await tx.wait();
  } catch (error) {
    console.error("Failed to mark ticket as used:", error);
    throw error;
  }
};
