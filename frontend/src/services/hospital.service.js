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

const hospitalService = {
    getAllHospitals
};

export default hospitalService;