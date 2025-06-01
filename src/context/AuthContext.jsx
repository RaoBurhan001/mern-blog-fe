// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../api';
import parseJwt from '../utils/parseJwt'

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      
  const [token, setTokenState] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // On mount, check localStorage for token
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log("🚀 ~ useEffect ~ storedToken:", storedToken)
    if (storedToken) {
      setAuthToken(storedToken);
      // Option 1: decode token to get user payload (id, role). Then fetch full user from /auth/me
      try {
        
        const decoded = parseJwt(storedToken);
        setUser({ id: decoded.id, role: decoded.role });
        setTokenState(storedToken);
      } catch {
        // invalid token
        localStorage.removeItem('token');
        setUser(null);
        setTokenState(null);
      }
    }
    setLoading(false);
  }, []);

  const registerUser = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);
      const { token: newToken } = res.data;
      localStorage.setItem('token', newToken);
      setAuthToken(newToken);
      const decoded = parseJwt(newToken);
      setUser({ id: decoded.id, role: decoded.role });
      setTokenState(newToken);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return false;
    }
  };

  const loginUser = async (formData) => {
    try {
      const res = await api.post('/auth/login', formData);
      const newToken = res.data.token;
      console.log("🚀 ~ loginUser ~ token:", newToken)
      localStorage.setItem('token', newToken);
      setAuthToken(newToken);
      const decoded = parseJwt(newToken);
      console.log("🚀 ~ loginUser ~ decoded:", decoded)
      setUser({ id: decoded.id, role: decoded.role });
      setTokenState(newToken);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return false;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
    setTokenState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        registerUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
