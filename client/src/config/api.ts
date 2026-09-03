import axios, { AxiosInstance } from "axios";

// Base URL loaded from client/.env environment variables
const baseURL = import.meta.env.VITE_API_URL || "";

const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export interface ApiResponse<T> {
    data: T;
    status: number;
}

export default api;