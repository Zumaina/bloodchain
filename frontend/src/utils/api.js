// frontend/src/utils/api.js
import axios from "axios";

// Simple axios instance for the whole app
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default api;
