import axiosInstance from "../api/axios";

const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to register user.",
    );
  }
};

const login = async (userData) => {
  try{
    const response = await axiosInstance.post("/auth/login",userData);
    return response.data;
  }catch(error){
    throw new Error(
        error.response?.data?.message || "login failed."
    );
  }
};

const authService = {
  register,
  login,
};

export default authService;
