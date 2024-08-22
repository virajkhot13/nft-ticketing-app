// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp({ role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log(`Signed up as ${role} with email: ${email}`);
    navigate(`/${role}-login`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">{role === 'creator' ? 'Creator' : 'User'} Sign Up</h1>
      <div className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
