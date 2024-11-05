import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use import.meta.env for Vite
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors for requests and responses here if needed
// api.interceptors.request.use(...)
// api.interceptors.response.use(...)

export default api;
