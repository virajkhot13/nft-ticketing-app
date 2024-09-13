import React, { useEffect, useState } from 'react';
import { connectWallet, buyTicket } from '../eth';
import { ethers } from 'ethers';
import TicketNFT from '../TicketNFT.json';
import generateQRCode from '../generateQRCode';
import ipfs from '../ipfs';
import { jsPDF } from 'jspdf';
import './EventsPage.css';
import EventModal from './EventModal';

const TICKET_NFT_ADDRESS = '0x3D9704d10EAf303f1584C7c12Cf8d6a7DfEFDa2A';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        await connectWallet();
        console.log('Wallet connected');

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(TICKET_NFT_ADDRESS, TicketNFT, signer);

        const eventIds = await contract.getAllEventIds();

        const eventsList = await Promise.all(
          eventIds.map(async (id) => {
            const event = await contract.getEventDetails(id);
            return {
              id: id.toString(),
              organization: event[0],
              teamName: event[1],
              eventName: event[2],
              description: event[3],
              venue: event[4],
              date: event[5],
              time: event[6],
              maxTickets: event[7].toString(),
              ticketsSold: event[8].toString(),
            };
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

  const handleBuyTicket = async (eventId, eventDetails) => {
    try {
      const ticketData = `Ticket for event ID: ${eventId}, Timestamp: ${Date.now()}`;
      const qrCodeDataURL = await generateQRCode(ticketData);

      const metadata = {
        name: `Ticket for ${eventDetails.eventName}`,
        description: `This is a ticket for ${eventDetails.eventName} (ID: ${eventId}).`,
        image: qrCodeDataURL,
        attributes: [
          { trait_type: 'Event ID', value: eventId },
          { trait_type: 'Event Name', value: eventDetails.eventName },
          { trait_type: 'Organization', value: eventDetails.organization },
          { trait_type: 'Venue', value: eventDetails.venue },
          { trait_type: 'Date', value: eventDetails.date },
          { trait_type: 'Time', value: eventDetails.time },
        ],
      };

      const result = await ipfs.add(JSON.stringify(metadata));
      const ticketURI = `https://ipfs.io/ipfs/${result.path}`;
      console.log('Ticket URI:', ticketURI);

      const tx = await buyTicket(eventId, ticketURI);
      generatePDF(eventDetails, qrCodeDataURL);

      alert('Ticket purchased successfully!');
      setSelectedEvent(null);
    } catch (error) {
      console.error('Failed to buy ticket:', error);
      alert('Failed to buy ticket. Please try again.');
    }
  };

  const generatePDF = (eventDetails, qrCodeDataURL) => {
    const doc = new jsPDF();
    doc.text('Event Ticket', 20, 20);
    doc.text(`Event: ${eventDetails.eventName}`, 20, 30);
    doc.text(`Organization: ${eventDetails.organization}`, 20, 40);
    doc.text(`Team: ${eventDetails.teamName}`, 20, 50);
    doc.text(`Description: ${eventDetails.description}`, 20, 60);
    doc.text(`Venue: ${eventDetails.venue}`, 20, 70);
    doc.text(`Date: ${eventDetails.date}`, 20, 80);
    doc.text(`Time: ${eventDetails.time}`, 20, 90);
    doc.addImage(qrCodeDataURL, 'PNG', 20, 100, 50, 50);
    doc.save('event_ticket.pdf');
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="events-page">
      <h1 className="events-title">Events</h1>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card" onClick={() => handleEventClick(event)}>
            <div className="event-image">
              <div className="placeholder-image">{event.eventName[0]}</div>
            </div>
            <div className="event-details">
              <p className="event-team">{event.teamName}</p>
              <h2 className="event-title">{event.eventName}</h2>
              <p className="event-subtitle">{event.organization}</p>
              <p className="event-description">{event.description}</p>
              <p className="event-seats">{event.maxTickets - event.ticketsSold} / {event.maxTickets} seats</p>
            </div>
            <div className="event-info">
              <div className="event-date-location">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.66667H4C3.26362 2.66667 2.66667 3.26362 2.66667 4V12C2.66667 12.7364 3.26362 13.3333 4 13.3333H12C12.7364 13.3333 13.3333 12.7364 13.3333 12V4C13.3333 3.26362 12.7364 2.66667 12 2.66667Z" stroke="#CCCCCC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.6667 1.33333V4" stroke="#CCCCCC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.33333 1.33333V4" stroke="#CCCCCC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.66667 6.66667H13.3333" stroke="#CCCCCC" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {event.date} {event.time} • {event.venue}
              </div>
              <button className="buy-button" onClick={(e) => { e.stopPropagation(); handleBuyTicket(event.id, event); }}>
                BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>
      <EventModal 
        event={selectedEvent} 
        onClose={handleCloseModal} 
        onBuy={handleBuyTicket}
      />
    </div>
  );
}

export default EventsPage;
