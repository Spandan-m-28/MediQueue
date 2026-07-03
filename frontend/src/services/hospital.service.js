import axiosInstance from "../api/axios";

const getAllHospitals = async () => {
    try{
        const response = await axiosInstance.get("/hospital");
        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Failed to fetch hospitals.",
        );
    }
}

const getHospital = async (id) => {
    try{
        const response = await axiosInstance.get(`/hospital/${id}`);
        return response.data;
    }catch(error){
        throw new Error(
            error.response?.data?.message || "Coudn't load hospital data",
        );
    }
}

const hospitalService = {
    getAllHospitals,
    getHospital
};

export default hospitalService;