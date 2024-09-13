import React, { useEffect, useState } from 'react';
import { connectWallet } from '../eth'; // Assuming you already have a connectWallet function
import { ethers } from 'ethers';
import TicketNFT from '../TicketNFT.json'; 

const TICKET_NFT_ADDRESS = '0x3D9704d10EAf303f1584C7c12Cf8d6a7DfEFDa2A'; 

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyTickets = async () => {
      try {
        await connectWallet();
        console.log('Wallet connected');

        const provider = new ethers.BrowserProvider(window.ethereum); 
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(TICKET_NFT_ADDRESS, TicketNFT, signer);

        const totalSupply = await contract._ticketIdCounter(); // Assuming you have a function or variable to get the total number of tickets minted.

        let ownedTickets = [];

        for (let ticketId = 0; ticketId < totalSupply; ticketId++) {
          const isOwner = await contract.isTicketOwner(ticketId);
          if (isOwner) {
            const ticketURI = await contract.tokenURI(ticketId);
            ownedTickets.push({ ticketId, ticketURI });
          }
        }

        setTickets(ownedTickets);
      } catch (error) {
        console.error("Failed to load tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMyTickets();
  }, []);

  if (loading) {
    return <p>Loading your tickets...</p>;
  }

  return (
    <div className="my-tickets">
      <h2>My Tickets</h2>
      {tickets.length === 0 ? (
        <p>You have no tickets.</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.ticketId}>
              <p>Ticket ID: {ticket.ticketId}</p>
              <a href={ticket.ticketURI} target="_blank" rel="noopener noreferrer">View Ticket</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTickets;
