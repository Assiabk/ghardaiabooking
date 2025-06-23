// ✅ /src/auth/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔄 Load user from session on page reload
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // ✅ Login Function
  const login = async (email, password) => {
    if (!email || !password) throw new Error('Email and password are required.');

    console.log('🔐 Attempting login with:', email);

    try {
      const res = await fetch(`${API_BASE}/api/admins/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ Login failed:', errorText);
        throw new Error(errorText || 'Login failed');
      }

      const data = await res.json();


      setUser(data);
      sessionStorage.setItem('user', JSON.stringify(data));
      console.log('✅ Login successful:', data);
      return data;

    } catch (err) {
      console.error('🔥 Login error:', err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    console.log('👋 Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
