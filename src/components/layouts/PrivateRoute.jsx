// src/components/layouts/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    // Role not authorized
    return <Navigate to="/unauthorized" />;
  }

  // Authorized: render child routes
  return <Outlet />;
};

export default PrivateRoute;
