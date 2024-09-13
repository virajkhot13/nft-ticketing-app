import React from 'react';
import './EventModal.css';

const EventModal = ({ event, onClose, onBuy }) => {
  if (!event) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="modal-image">
          {event.imageUrl ? (
            <img src={event.imageUrl} alt={event.eventName} />
          ) : (
            <div className="placeholder-image">No Image Available</div>
          )}
        </div>
        <h2>{event.eventName}</h2>
        <p className="event-team">{event.teamName}</p>
        <p className="event-organizer">{event.organization}</p>
        <p className="event-description">{event.description}</p>
        <div className="event-details">
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Venue:</strong> {event.venue}</p>
          <p><strong>Available Seats:</strong> {event.maxTickets - event.ticketsSold} / {event.maxTickets}</p>
        </div>
        <button className="buy-button" onClick={() => onBuy(event.id, event)}>BUY NOW</button>
      </div>
    </div>
  );
};

export default EventModal;
