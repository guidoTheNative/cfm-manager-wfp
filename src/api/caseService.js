// caseService.js
import api from './api'; // Adjust the import based on your file structure
const resource = '/cases/'; // Change the resource to manage cases

// Function to create a new case
export const createCase = async (caseData) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const response = await api.post(resource, caseData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });
    return response.data; // Return the created case data
  } catch (error) {
    throw error; // Handle error as needed
  }
};

// Get case details (Read)

export const getCase = async (caseId) => {
  try {
    const token = localStorage.getItem('token') // Retrieve token from local storage
    const endpoint = caseId ? `${resource}${caseId}` : resource // Use resource directly if no userId is provided
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

// Update case details
export const updateCase = async (caseId, caseData) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const response = await api.put(`${resource}${caseId}`, caseData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });
    return response.data; // Return the updated case data
  } catch (error) {
    throw error; // Handle error as needed
  }
};

// Delete case
export const deleteCase = async (caseId) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const response = await api.delete(`${resource}${caseId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });
    return response.data; // Return a success message or status
  } catch (error) {
    throw error; // Handle error as needed
  }
};

// Logout function to clear the token
export const logout = () => {
  localStorage.removeItem('token'); // Remove the token from local storage
};
