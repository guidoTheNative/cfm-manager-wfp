// authService.js
import api from './api' // Adjust the import based on your file structure
const resource = '/users/'

// Function to log in and retrieve a token
export const login = async (username, password) => {
  try {
    const response = await api.post(resource + 'sign-in', { username, password })
    const { token } = response.data // Assuming the token is in the response
    localStorage.setItem('token', token) // Store the token in local storage
    return response.data // Return user data or token as needed
  } catch (error) {
    throw error // Handle error as needed
  }
}

// Register function (Create)
export const create = async (userData) => {
  try {
    const token = localStorage.getItem('token') // Retrieve token from local storage

    const response = await api.post(resource, userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    })
    return response.data // Return the created user data
  } catch (error) {
    throw error // Handle error as needed
  }
}

// Get user details (Read)
export const getUser = async (userId) => {
  try {
    const token = localStorage.getItem('token') // Retrieve token from local storage
    const endpoint = userId ? `${resource}${userId}` : resource // Use resource directly if no userId is provided
    const response = await api.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    })
    return response.data // Return the user data
  } catch (error) {
    throw error
  }
}


// Update user details
export const updateUser = async (userId, userData) => {
  try {
    const token = localStorage.getItem('token') // Retrieve token from local storage
    const response = await api.put(`${resource}${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    })
    return response.data // Return the updated user data
  } catch (error) {
    throw error
  }
}

// Delete user
export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('token') // Retrieve token from local storage
    const response = await api.delete(`${resource}${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    })
    return response.data // Return a success message or status
  } catch (error) {
    throw error
  }
}

// Logout function to clear the token
export const logout = () => {
  localStorage.removeItem('token') // Remove the token from local storage
}
