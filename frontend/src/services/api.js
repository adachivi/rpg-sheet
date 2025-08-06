import axios from "axios"; // Lib. for HTTP requests (GET, POST, etc.)

// Create an instance of axios integrated with the backend
const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL,

});

export default api; // Make it available to the rest of the project