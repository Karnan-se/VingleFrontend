import { userApi } from "../../axios/axiosInstance"

export const courseRatings = async (courseId)=>{
    try {
        
        const ratings = await userApi.get("/courseRatings", {params:{courseId}})
     
        return ratings.data.courseRatings
        
    } catch (error) {
        console.log(error)
        throw error
        
    }

}

export const individualRatings = async(courseId)=>{
    try {
        const ratings = await userApi.get("/getIndividualRatings", {params:{courseId}})
        console.log(ratings.data , "response of individual Ratings ")
        return ratings.data.courseRatings
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}