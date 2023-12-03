import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

// Request interceptor for Access-Control-Allow-Origin
axiosInstance.interceptors.request.use(
  (config) => {
    // config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
