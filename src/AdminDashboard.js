import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { connectWallet, getContract } from './eth';

function AdminDashboard() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', price: '', seats: '', info: '' });

  useEffect(() => {
    const init = async () => {
      try {
        const signer = await connectWallet();
        const account = await signer.getAddress();
        setCurrentAccount(account);
        const contractInstance = await getContract(signer);
        setContract(contractInstance);
      } catch (error) {
        console.error("Error initializing the contract:", error);
      }
    };
    init();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevState => ({ ...prevState, [name]: value }));
  };

  const createEvent = async () => {
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }
  
    try {
      const tx = await contract.createEvent(
        newEvent.name,
        newEvent.date,
        ethers.utils.parseUnits(newEvent.price, 'ether'),  // Updated line
        parseInt(newEvent.seats),
        newEvent.info
      );
      await tx.wait();
      alert("Event created: " + newEvent.name);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={newEvent.name}
        onChange={handleInputChange}
        className="border p-2 m-2"
      />
      <input
        type="text"
        name="date"
        placeholder="Event Date"
        value={newEvent.date}
        onChange={handleInputChange}
        className="border p-2 m-2"
      />
      <input
        type="text"
        name="price"
        placeholder="Ticket Price (ETH)"
        value={newEvent.price}
        onChange={handleInputChange}
        className="border p-2 m-2"
      />
      <input
        type="text"
        name="seats"
        placeholder="Number of Seats"
        value={newEvent.seats}
        onChange={handleInputChange}
        className="border p-2 m-2"
      />
      <input
        type="text"
        name="info"
        placeholder="Additional Info"
        value={newEvent.info}
        onChange={handleInputChange}
        className="border p-2 m-2"
      />
      <button onClick={createEvent} className="bg-green-500 text-white p-2 rounded m-2">Create Event</button>
    </div>
  );
}

export default AdminDashboard;
