import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface ApiResponse<T> {
    data: T;
    status: number;
}

export default api;