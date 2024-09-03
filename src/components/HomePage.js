import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../RoleContext';

function HomePage({ userAddress, isCreator }) {
  const navigate = useNavigate();
  const { role } = useRole();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to the NFT Ticketing Platform</h1>
      <p className="text-xl">Connected as: {userAddress}</p>
      <div className="space-y-4">
        {role === 'creator' && (// Only show "Create Event" for creators
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate('/create-event')}
          >
            Create Eventss 
          </button>
        )}
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => navigate('/events')}
        >
          Events
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={() => navigate('/social')}
        >
          Social
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={() => navigate('/profile')}
        >
          Profile
        </button>
      </div>
    </div>
  );
}

export default HomePage;
