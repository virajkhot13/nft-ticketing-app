import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../RoleContext';

function HomePage({ userAddress, isCreator }) {
  const navigate = useNavigate();
  const { role } = useRole();

  return (
    <div className="front_page_content">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} className="logo_png" alt="Logo" />
          <div className="logo_name">LUMINA</div>
        </div>

        <div className="href_links">
          <ul>
            <li className="href_selected">Home</li>
            <li onClick={() => navigate('/create-event')}>Create</li>
            <li>About</li>
            <li onClick={() => navigate('/events')}>Events</li>
            <li>Connect Wallet</li>
          </ul>
        </div>
        
        <button type="button" className="connect_wallet_button">Connect Wallet</button>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="left_content">
          <div className="tagline">
            Experience seamless, secure &amp; innovative ticketing with our
            <br /> cutting-edge
          </div>
          <div className="heading">NFT Ticketing Platform</div>
          {role === 'creator' && (
            <button className="button" onClick={() => navigate('/create-event')}>
              Create TKT
            </button>
          )}
        </div>

        <div className="right_content">
          <div className="image_1">
            <img src={`${process.env.PUBLIC_URL}/assets/image_front.png`} className="front_page_img_prop" alt="Front Image" />
          </div>
          <div className="image_2">
            <img src={`${process.env.PUBLIC_URL}/assets/image_back.png`} className="front_page_img_prop" alt="Back Image" />
          </div>
        </div>
      </div>

      {/* Supported Blockchains */}
      <div className="bitcoins_name">
        <ul>
          <li>Solana</li>
          <li>Avalanche</li>
          <li>Stellar</li>
          <li>Tron</li>
          <li>Ethereum</li>
        </ul>
      </div>

      {/* Advantages Section */}
      <div className="advantages_of_nft">
        <div className="left_content">
          <img src={`${process.env.PUBLIC_URL}/assets/Group_of_3_images.png`} alt="Advantages" className="group_of_3_img" />
        </div>
        <div className="right_content">
          <ul>
            <li className="line_1">The Future is Here</li>
            <li className="line_2">Immersive Experience</li>
            <li className="line_3">Fast Secure Authentic</li>
          </ul>
        </div>
      </div>

      {/* Ticket Creation Section */}
      <div className="creating_a_ticket content_heading">Creating a Ticket</div>
      <div className="nft_information_box">
        <div className="box_1 boxes">
          <div className="title">Creating Ticket Design</div>
          <div className="desc">
            Create a digital design for your ticket using graphic design software. Include essential details such as event name, date, time, and any unique features or branding elements.
          </div>
        </div>
        <div className="box_2 boxes">
          <div className="title">Mint Your Ticket</div>
          <div className="desc">
            Use an NFT marketplace or platform like OpenSea, Mintable to mint your ticket, then upload the ticket design and choose blockchain specifications.
          </div>
        </div>
        <div className="box_3 boxes">
          <div className="title">Distribute and Manage Tickets</div>
          <div className="desc">
            List the NFT tickets for sale or distribute them on your chosen platform. Share the link with your audience, and manage ticket ownership and transfers through the NFT platform, ensuring seamless and secure access for your event attendees.
          </div>
        </div>
      </div>

      {/* What We Give Section */}
      <div className="creating_a_ticket content_heading">What We Give :)</div>
      <div className="what_we_give_content">
        <div className="left_content">
          <div className="trust_info">
            <div className="trust_logo">
              <img src={`${process.env.PUBLIC_URL}/assets/heart_logo.png`} alt="Trust Logo" />
            </div>
            <div className="trust_desc">
              Trusted by 150+ users, made by the students for the students.
            </div>
          </div>
          <div className="privacy_info">
            <div className="privacy_logo">
              <img src={`${process.env.PUBLIC_URL}/assets/lock_logo.png`} alt="Privacy Logo" />
            </div>
            <div className="privacy_desc">Your Tickets, Your Control. Ultimate Security for Every Event.</div>
          </div>
          <div className="ui_info">
            <div className="ui_logo">
              <img src={`${process.env.PUBLIC_URL}/assets/pot_logo.png`} alt="UI Logo" />
            </div>
            <div className="ui_desc">Sleek and Simple. Navigate with ease and clarity.</div>
          </div>
        </div>

        <div className="right_content">
          <img src={`${process.env.PUBLIC_URL}/assets/orion_pass_1.png`} alt="Orion Pass 1" className="orion_pass_img_1" />
          <img src={`${process.env.PUBLIC_URL}/assets/orion_pass_2.png`} alt="Orion Pass 2" className="orion_pass_img_2" />
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="left_href">
          <ul>
            <li>What's New</li>
            <li>Discover</li>
            <li>Pricing</li>
            <li>About Us</li>
            <li>Help</li>
          </ul>
        </div>
        <div className="right_href">
          <ul>
            <li>UI UX by Harshwardhan Jatal</li>
            <li>Front-End by Rohit Shelot</li>
            <li>Back-End by Viraj Khot</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
