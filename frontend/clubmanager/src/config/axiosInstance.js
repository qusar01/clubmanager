import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
});


axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Sesja wygasła.");
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
    }
    return Promise.reject(error);
  }
);




export default axiosInstance;
