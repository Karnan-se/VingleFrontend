import { adminApi } from "../../axios/axiosInstance"

export const rejectCourse = async (rejectionReasons , tutorId)=>{
    try {
        const response = await adminApi.post("/sendCourseRejection", {rejectionReasons, tutorId})
        console.log(response.data.rejection)
        return response.data.rejection;
        
    } catch (error) {
        console.log(error)
        throw error
        
    }

}