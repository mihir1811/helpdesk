import axios from "axios";

const APIInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URI,
  });

APIInstance.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('authtoken')
    config.headers.authorization = authToken ? authToken : '';
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default APIInstance