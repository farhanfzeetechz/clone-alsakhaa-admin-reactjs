import axios from "axios";
import Cookies from "js-cookie";

export const imageBaseUrl = 'https://backend.alsakhaa.wise-hustlers.tech';

const axiosInstance = axios.create({
    // baseURL: 'http://192.168.1.66:6970',
    baseURL: 'https://backend.alsakhaa.wise-hustlers.tech',
    headers: {
        'Content-Type': 'application/json',
    },
});
// Attach token before every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token') || localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
);



export default axiosInstance