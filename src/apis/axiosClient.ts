import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
