import { userApi } from "../../axios/axiosInstance"


export const sendRatings = async(ratings)=>{
    try {
        const saveRatings = await userApi.post("/saveRatings", {ratings})
        console.log(saveRatings.data , "saveRatings saveRatings saveRatings")
        return saveRatings.data.ratings
        
    } catch (error) {
        console.log(error)  
    }
}