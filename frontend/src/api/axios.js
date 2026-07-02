import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URI}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

export default axiosInstance;