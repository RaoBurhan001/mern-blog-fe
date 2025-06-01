import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-20 w-full bg-white shadow flex items-center justify-between px-8 py-4 mb-6">
      <div>
        <Link to="/" className="font-bold text-2xl text-blue-700">MERN Blog</Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-600 font-medium">Home</Link>
        {!user && (
          <>
            <Link to="/login" className="hover:text-blue-600 font-medium">Login</Link>
            <Link to="/register" className="hover:text-blue-600 font-medium">Register</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/dashboard" className="hover:text-blue-600 font-medium">Dashboard</Link>
            <button onClick={handleLogout} className="ml-2 px-4 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-medium">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
