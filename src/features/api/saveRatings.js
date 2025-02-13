import { userApi } from "../../axios/axiosInstance"


export const sendRatings = async(ratings)=>{
    try {
        const saveRatings = await userApi.post("/saveRatings", {ratings})
        console.log(saveRatings.data , "saveRatings saveRatings saveRatings")
        return saveRatings.data
        
    } catch (error) {
        console.log(error)  
    }
}

export const fetchAverageRating = async(courseId)=>{
    try {
        const averageRatings = await userApi.post("averageRatings", {courseId})
        console.log(averageRatings.data)
        return averageRatings.data.averageRating
    } catch (error) {
        console.log(error)
        
    }
}

