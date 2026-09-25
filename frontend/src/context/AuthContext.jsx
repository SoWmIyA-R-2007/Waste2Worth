import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('w2w_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-101',
      fullName: 'Sowmiya R',
      email: 'sowmiya@w2w.org',
      role: 'ROLE_USER',
      ecoPoints: 1850,
      totalWasteKg: 28.4
    };
  });

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('w2w_user', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('w2w_user');
    setCurrentUser(null);
  };

  const switchRole = (role) => {
    const updated = { ...currentUser, role };
    setCurrentUser(updated);
    localStorage.setItem('w2w_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
