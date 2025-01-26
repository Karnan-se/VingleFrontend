import { adminApi, tutorApi, userApi } from "../../axios/axiosInstance"

export const totalCourse  = async (tutorId)=>{
    try {
        const totalCourse = await tutorApi.get("/tutorsCourse",{params:{tutorId}})
        return totalCourse.data
        
    } catch (error) {
        console.log(error)
        
    }
}

export const getInStructorDetails = async (tutorId)=>{
    try {
        console.log(tutorId, "ghhjhfhkj")
        const instructorDetails = await adminApi.post("/tutorsApplication", {_id:tutorId})
        return instructorDetails.data
        
    } catch (error) {
        console.log(error)
        
    }
}