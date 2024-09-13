import React from 'react';
import MyTickets from './MyTickets';

function Profile() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <p className="text-xl">This is the profile page where users can view and edit their profile.</p>
      <MyTickets /> 
      {/* Add profile management functionality */}
    </div>
  );
}

export default Profile;
