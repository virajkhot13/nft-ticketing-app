import React, { useState, useRef } from 'react'; // Add useRef
import './CreateEventPage.css';
import { useNavigate } from 'react-router-dom';
import { createEvent, connectWallet } from '../eth'; // Ensure all necessary functions are imported
import ipfs from '../ipfs'; // Import IPFS client
import { Buffer } from 'buffer';

function CreateEventPage() {
  const [organization, setOrganization] = useState('');
  const [teamName, setTeamName] = useState('');
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maxTickets, setMaxTickets] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // State for image upload
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Add this line

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state
    try {
      // Ensure wallet connection is established and contract is initialized
      const address = await connectWallet();
      console.log('Wallet connected:', address); // Debugging line

      // Convert maxTickets to integer if it's coming as a string
      const maxTicketsInt = parseInt(maxTickets, 10);
      if (isNaN(maxTicketsInt)) throw new Error("Invalid number for max tickets");

      // Upload image to IPFS
      let imageIPFSHash = '';
      if (imageFile) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(imageFile);
        reader.onloadend = async () => {
          const buffer = Buffer.from(reader.result);
          const result = await ipfs.add(buffer);
          imageIPFSHash = result.path; // Get the IPFS hash of the image
          console.log('Image uploaded to IPFS:', imageIPFSHash);

          // Continue with event creation
          await createEvent(
            organization, teamName, eventName, description,
            venue, date, time, maxTicketsInt,
            `https://ipfs.io/ipfs/${imageIPFSHash}` // Add the IPFS image hash to event metadata
          );
          navigate('/events'); // Redirect to events page after creating an event
        };
      } else {
        throw new Error('Please upload an image for the event');
      }
    } catch (error) {
      console.error("Failed to create event:", error); // Improved error logging
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="create-event-container">
      <div className="create-event-image-section">
        <div className="create-event-image-container" onClick={handleUploadClick}>
          {imagePreview ? (
            <img src={imagePreview} alt="Event preview" />
          ) : (
            <div style={{ 
              color: '#ffffff',
              textAlign: 'center'
            }}>
              <p>Click to upload image</p>
            </div>
          )}
        </div>
        <div className="upload-nft-box" onClick={handleUploadClick}>Upload NFT</div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>
      <div className="create-event-form-container">
        <h2>Event Name</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="organization">Organization name</label>
            <input
              type="text"
              id="organization"
              placeholder="Organization name"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="teamName">Team name</label>
            <input
              type="text"
              id="teamName"
              placeholder="Team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventName">Event name</label>
            <input
              type="text"
              id="eventName"
              placeholder="Event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              placeholder="Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxTickets">Max Tickets</label>
            <input
              type="number"
              id="maxTickets"
              placeholder="Max Tickets"
              value={maxTickets}
              onChange={(e) => setMaxTickets(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create TKT</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEventPage;
