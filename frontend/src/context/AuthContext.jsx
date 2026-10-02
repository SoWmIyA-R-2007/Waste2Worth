import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

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

  const [token, setToken] = useState(() => localStorage.getItem('w2w_token') || null);

  const login = (userData, jwtToken) => {
    setCurrentUser(userData);
    localStorage.setItem('w2w_user', JSON.stringify(userData));
    if (jwtToken) {
      setToken(jwtToken);
      localStorage.setItem('w2w_token', jwtToken);
    }
  };

  const logout = () => {
    localStorage.removeItem('w2w_user');
    localStorage.removeItem('w2w_token');
    setCurrentUser(null);
    setToken(null);
  };

  const switchRole = (role) => {
    let email = currentUser?.email || 'sowmiya@w2w.org';
    let fullName = currentUser?.fullName || 'User';

    if (role === 'ROLE_ADMIN') {
      fullName = 'Central Administrator';
      email = 'admin@waste2worth.gov.in';
    } else if (role === 'ROLE_RECYCLER') {
      fullName = 'GreenCycle Center';
      email = 'greencycle@w2w.org';
    } else if (role === 'ROLE_USER') {
      fullName = 'Sowmiya R';
      email = 'sowmiya@w2w.org';
    }

    const updated = {
      ...currentUser,
      role,
      fullName,
      email
    };
    setCurrentUser(updated);
    localStorage.setItem('w2w_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
