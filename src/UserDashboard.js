import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { connectWallet, getContract } from './eth';

function UserDashboard() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [newOwner, setNewOwner] = useState(""); // Added this line

  useEffect(() => {
    const init = async () => {
      try {
        const signer = await connectWallet();
        const account = await signer.getAddress();
        setCurrentAccount(account);
        const contractInstance = await getContract(signer);
        setContract(contractInstance);
        const events = await fetchEvents(contractInstance);
        setEvents(events);
      } catch (error) {
        console.error("Error initializing the contract:", error);
      }
    };
    init();
  }, []);

  const fetchEvents = async (contractInstance) => {
    const eventCount = await contractInstance.totalEvents(); // Correct method
    let events = [];
    for (let i = 1; i <= eventCount; i++) {
      try {
        const event = await contractInstance.getEventDetails(i);
        events.push({
          id: i,
          name: event[0],
          date: event[1],
          price: event[2],
          seatsAvailable: event[3],
          additionalInfo: event[4]
        });
      } catch (error) {
        console.error(`Error fetching event ${i}:`, error);
        break;
      }
    }
    return events;
  };

  const buyTicket = async (event) => {
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }

    try {
      const ticketPrice = ethers.utils.parseUnits(event.price.toString(), "ether");

      const tx = await contract.buyTicket(event.id, { value: ticketPrice });
      await tx.wait();
      alert("Ticket purchased for event: " + event.name);
      const tickets = await fetchUserTickets(contract, currentAccount);
      setTickets(tickets);
    } catch (error) {
      console.error("Error purchasing ticket:", error);
    }
  };

  const fetchUserTickets = async (contractInstance, user) => {
    const ticketIds = await contractInstance.getUserTickets(user);
    let tickets = [];
    for (let i = 0; i < ticketIds.length; i++) {
      try {
        const ticket = await contractInstance.getTicketDetails(ticketIds[i]);
        tickets.push({
          id: ticketIds[i],
          eventName: ticket[0],
          eventDate: ticket[1],
          ticketPrice: ticket[2],
          additionalInfo: ticket[3],
          status: ticket[4]
        });
      } catch (error) {
        console.error(`Error fetching ticket ${ticketIds[i]}:`, error);
      }
    }
    return tickets;
  };

  const transferTicket = async (ticketId, newOwner) => {
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }

    try {
      const tx = await contract.transferTicket(ticketId, newOwner);
      await tx.wait();
      alert("Ticket transferred!");
      const tickets = await fetchUserTickets(contract, currentAccount);
      setTickets(tickets);
    } catch (error) {
      console.error("Error transferring ticket:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      <div className="mt-4">
        <h2 className="text-2xl">Events</h2>
        {events.map((event, index) => (
          <div key={index} className="border p-4 m-2">
            <h3 className="text-xl">{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>Price: {event.price ? ethers.utils.formatUnits(event.price.toString(), 'ether') : "N/A"} ETH</p>
            <p>Seats Available: {event.seatsAvailable}</p>
            <p>Info: {event.additionalInfo}</p>
            <button onClick={() => buyTicket(event)} className="bg-red-500 text-white p-2 rounded m-2">Buy Ticket</button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-2xl">My Tickets</h2>
        {tickets.map((ticket, index) => (
          <div key={index} className="border p-4 m-2">
            <h3 className="text-xl">{ticket.eventName}</h3>
            <p>Date: {ticket.eventDate}</p>
            <p>Price: {ticket.ticketPrice ? ethers.utils.formatUnits(ticket.ticketPrice.toString(), 'ether') : "N/A"} ETH</p>
            <p>Info: {ticket.additionalInfo}</p>
            <p>Status: {ticket.status === 0 ? "Valid" : "Used"}</p>
            {ticket.status === 0 && (
              <div>
                <input
                  type="text"
                  placeholder="New Owner Address"
                  className="border p-2 m-2"
                  onChange={(e) => setNewOwner(e.target.value)}
                />
                <button onClick={() => transferTicket(ticket.id, newOwner)} className="bg-yellow-500 text-white p-2 rounded m-2">Transfer Ticket</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
