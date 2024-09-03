// components/EventsPage.js

import React, { useEffect, useState } from 'react';
import { connectWallet } from '../eth'; // Corrected import
import { ethers } from 'ethers';
import TicketNFT from '../TicketNFT.json'; // Import ABI

const TICKET_NFT_ADDRESS = '0x7a1C4a323A87AF45dd670Df18960964551c54CfF'; // Replace with your contract address

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        // Ensure the wallet is connected before interacting with the contract
        await connectWallet();
        console.log('Wallet connected');

        const provider = new ethers.BrowserProvider(window.ethereum); // Ensure MetaMask or similar provider
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(TICKET_NFT_ADDRESS, TicketNFT.abi, signer);

        // Fetch all event IDs
        const eventIds = await contract.getAllEventIds();

        // Fetch all events based on their IDs
        const eventsList = await Promise.all(
          eventIds.map(async (id) => {
            const event = await contract.getEventDetails(id);
            return { id: id.toString(), ...event }; // Convert BigNumber to string
          })
        );

        setEvents(eventsList);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleBuyTicket = async (eventId) => {
    try {
      // Your logic to buy a ticket (mintTicket or similar)
      console.log("Ticket purchase logic here...");
    } catch (error) {
      console.error("Failed to buy ticket:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-xl">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      <div className="space-y-4">
        {events.length === 0 ? (
          <p className="text-xl">No events found</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="p-4 border rounded-md shadow-md bg-white">
              <h2 className="text-xl font-bold">{event.eventName}</h2>
              <p><strong>Organization:</strong> {event.organization}</p>
              <p><strong>Team Name:</strong> {event.teamName}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Max Tickets:</strong> {event.maxTickets.toString()}</p>
              <p><strong>Tickets Sold:</strong> {event.ticketsSold.toString()}</p>
              <button
                onClick={() => handleBuyTicket(event.id)}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Buy Ticket
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventsPage;
