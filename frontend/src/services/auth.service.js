import axiosInstance from "../api/axios";

const register = async (userData) => {
    const response = await axiosInstance.post("/auth/register",userData);
    return response.data;
};

const login = async (userData) => {
    
};

const authService = {
    register,
    login
}

export default authService;