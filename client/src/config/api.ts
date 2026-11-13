import axios, { AxiosInstance } from "axios";

// Base URL loaded from client/.env environment variables
const baseURL = import.meta.env.VITE_API_URL || "";

const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 15000,
});

// Attach JWT token from localStorage if available (ensures cross-domain auth works on mobile browsers)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export interface ApiResponse<T> {
    data: T;
    status: number;
}

export default api;