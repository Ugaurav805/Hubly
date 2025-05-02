import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://hubly-ktvo.onrender.com", 
});

export const handleError = (error) => {
  console.error("API Error:", error);
  const errorMessage =
    error?.response?.data?.message || error?.message || "Something went wrong!";
  toast.error(errorMessage); 
  return errorMessage;
};

export const handleSuccess = (message) => {
  toast.success(message || "Success!");
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
