import { tutorApi, userApi } from "../../axios/axiosInstance"

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