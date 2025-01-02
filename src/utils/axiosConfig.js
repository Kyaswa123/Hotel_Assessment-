import axios from "axios";

// const BASE_URL1 = "http://localhost:5000";

const BASE_URL2 =
  "https://run.mocky.io/v3/883cbb24-0c7c-4dd1-9995-ab0e8ba70a26";

const api = axios.create({
  baseURL: BASE_URL2,
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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
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
