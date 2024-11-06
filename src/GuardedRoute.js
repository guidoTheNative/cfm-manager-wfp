// GuardedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const GuardedRoute = ({ children, requiredRole, isAuthenticated, userRole }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (requiredRole && requiredRole !== userRole) {
    return <Navigate to="/login" />; // or another page
  }
  return children; // Render the protected component
};

export default GuardedRoute;
