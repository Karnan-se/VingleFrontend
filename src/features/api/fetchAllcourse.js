import { adminApi, tutorApi, userApi } from "../../axios/axiosInstance"

export const fetchAllCourse = async()=>{
    try {
        const allCourse = await userApi.get("/getallCourse")
        console.log(allCourse)
        return allCourse.data.courses
    } catch (error) {
        console.log(error)
         throw error
        
    }
}

export const updateCourse = async(courseId , courseDetails)=>{
    try {
        const updateCourse = await adminApi.post("/updateCourse", {courseId , courseDetails})
        console.log(updateCourse.data , "updateCourse")
        return updateCourse.data
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}

export const getCourse = async(courseId)=>{
   try {
    const response = await userApi.post("/getCourse", {courseId});
    console.log(response.data.course);
    return response.data.course;

    
   } catch (error) {
    console.log(error)
    throw error
    
   }
}