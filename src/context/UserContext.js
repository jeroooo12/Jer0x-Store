// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Al cargar, revisa si hay usuario en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Esta función guarda el usuario en estado y localStorage
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('usuario', JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
}
