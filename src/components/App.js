// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WhoAreYou from './components/WhoAreYou';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WhoAreYou />} />
        <Route path="/creator-login" element={<Login role="creator" />} />
        <Route path="/user-login" element={<Login role="user" />} />
        <Route path="/creator-signup" element={<SignUp role="creator" />} />
        <Route path="/user-signup" element={<SignUp role="user" />} />
      </Routes>
    </Router>
  );
}

export default App;
