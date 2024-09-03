// src/RoleContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const RoleContext = createContext();

// Create a custom hook to use the RoleContext
export const useRole = () => {
  return useContext(RoleContext);
};

// Create a Provider component
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null); // State to store the user's role

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
