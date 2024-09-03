import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MetaMaskLogin from './components/MetaMaskLogin';
import HomePage from './components/HomePage';
import CreateEvent from './components/CreateEventPage';
import Events from './components/EventsPage';
import Social from './components/Social';
import Profile from './components/profile';
import WhoAreYou from './components/WhoAreYou';
import { RoleProvider } from './RoleContext';

function App() {
  const [userAddress, setUserAddress] = useState('');

  const handleLogin = (address) => {
    setUserAddress(address);
  };

  return (
    <RoleProvider>
    <Router>
      <Routes>
        <Route path="/" element={<WhoAreYou />} />
        <Route path="/login" element={<MetaMaskLogin onLogin={handleLogin} />} />
        <Route path="/home" element={<HomePage userAddress={userAddress} />} />
        <Route path="/create-event" element={<CreateEvent/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/social" element={<Social/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
    </RoleProvider>
  );
}

export default App;
