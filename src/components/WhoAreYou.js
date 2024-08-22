// src/components/WhoAreYou.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function WhoAreYou() {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    if (option === 'creator') {
      navigate('/creator-login');
    } else if (option === 'user') {
      navigate('/user-login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Who Are You?</h1>
      <div className="flex space-x-8">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => handleOptionClick('creator')}
        >
          Creator
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={() => handleOptionClick('user')}
        >
          User
        </button>
      </div>
    </div>
  );
}

export default WhoAreYou;
