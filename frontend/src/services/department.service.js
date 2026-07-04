import axiosInstance from "../api/axios.js";

const getAllDepartments = async (id) => {
    try{
        const response = await axiosInstance.get(`/department/${id}`);
        return response.data.departments;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Failed to fetch Departments.",
        );
    }
}

const departmentService = {
    getAllDepartments
}

export default departmentService;