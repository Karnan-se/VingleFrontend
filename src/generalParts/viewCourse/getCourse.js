import { tutorApi } from "../../axios/axiosInstance"

export const getCourse = async(courseId)=>{
   

    
    
    const response = await tutorApi.post("/getCourse", {courseId});
    console.log(response.data.course);
    return response.data.course;

}