import React from 'react'
import { Navigate } from 'react-router-dom'

// ProtectedRoute component definition
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole') // Get the user role from localStorage
  const isAuthenticated = !!localStorage.getItem('token') // Check if a token exists (or use a more robust auth check)

  // Check if the user is authenticated and has an allowed role
  if (isAuthenticated && allowedRoles.includes(userRole)) {
    return children // Render the protected component
  } else {
    return <Navigate to="/login" replace /> // Redirect to login page if not authorized
  }
}

export default ProtectedRoute
