import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
