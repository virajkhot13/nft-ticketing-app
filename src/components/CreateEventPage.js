// components/CreateEventPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent, connectWallet } from '../eth'; // Ensure all necessary functions are imported

function CreateEventPage() {
  const [organization, setOrganization] = useState('');
  const [teamName, setTeamName] = useState('');
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maxTickets, setMaxTickets] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure wallet connection is established and contract is initialized
      const address = await connectWallet();
      console.log('Wallet connected:', address); // Debugging line

      // Convert maxTickets to integer if it's coming as a string
      const maxTicketsInt = parseInt(maxTickets, 10);
      if (isNaN(maxTicketsInt)) throw new Error("Invalid number for max tickets");

      await createEvent(organization, teamName, eventName, description, venue, date, time, maxTicketsInt);
      navigate('/events'); // Redirect to events page after creating an event
    } catch (error) {
      console.error("Failed to create event:", error); // Improved error logging
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Create Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="time"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max Tickets"
          value={maxTickets}
          onChange={(e) => setMaxTickets(e.target.value)} // Convert later
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventPage;
