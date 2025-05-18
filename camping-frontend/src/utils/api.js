import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com/api', // Replace with your API base URL
  timeout: 5000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example of adding an interceptor for requests
api.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or other custom headers here
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example of adding an interceptor for responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error('Unauthorized, redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default api;


