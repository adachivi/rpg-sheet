import axios from 'axios'; // Lib. for HTTP requests (GET, POST, etc.)

// Create an instance of axios integrated with the backend
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export default api; // Make it available to the rest of the project