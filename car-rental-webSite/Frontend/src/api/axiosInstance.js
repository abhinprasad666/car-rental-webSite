import axios from "axios";

// Create instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000", // Use env file for URL
  withCredentials: true, // To send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;