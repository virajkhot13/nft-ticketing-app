import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectWallet } from '../eth';

function MetaMaskLogin({ onLogin }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (walletConnected) {
      navigate('/home'); // Navigate to home page when the wallet is connected
    }
  }, [walletConnected, navigate]);

  const handleConnect = async () => {
    try {
      const address = await connectWallet();
      console.log("Connected wallet address:", address);
      onLogin(address);
      setWalletConnected(true); // Update the state to reflect that the wallet is connected
    } catch (error) {
      setErrorMessage('Failed to connect wallet. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Connect Your Wallet</h1>
      {!walletConnected ? (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleConnect}
        >
          Connect MetaMask
        </button>
      ) : (
        <p className="text-green-500 mt-4">Wallet connected! Redirecting...</p>
      )}
      {errorMessage && (
        <p className="text-red-500 mt-4">{errorMessage}</p>
      )}
    </div>
  );
}

export default MetaMaskLogin;
