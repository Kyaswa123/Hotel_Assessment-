import axios from "axios";
import { CalendarDays, List, Data } from "lucide-react";
import BookingModal from "../components/BookingModal";

const BASE_URL = "https://run.mocky.io/v3/c4889414-e2b2-412f-a48a-dda733d95220";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Request Config:", config); // Logging request details for debugging

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Log the response data

    // You can also log other parts of the response if needed
    console.log("Response Status:", response.status);
    return response; // Return the response so that it can be handled by the caller
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    switch (status) {
      case 401:
        console.error("Unauthorized access");
        // Redirect to login or refresh token
        break;
      case 403:
        console.error("Forbidden access");
        break;
      case 404:
        console.error("Resource not found");
        break;
      case 500:
        console.error("Server error");
        break;
      default:
        console.error("Network error", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
