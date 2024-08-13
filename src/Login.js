import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin');
  };

  const handleUserLogin = () => {
    navigate('/user');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">College Fest NFT Ticketing</h1>
      <button onClick={handleAdminLogin} className="bg-blue-500 text-white p-4 rounded mb-4">Admin Login</button>
      <button onClick={handleUserLogin} className="bg-green-500 text-white p-4 rounded">User Login</button>
    </div>
  );
}

export default Login;
