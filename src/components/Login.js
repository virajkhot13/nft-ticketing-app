// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Logged in as ${role} with email: ${email}`);
    navigate('/');
  };

  const handleSignUp = () => {
    navigate(`/${role}-signup`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">{role === 'creator' ? 'Creator' : 'User'} Login</h1>
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
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="text-blue-500 underline"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
