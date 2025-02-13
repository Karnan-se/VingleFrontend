import { tutorApi } from "../../axios/axiosInstance";


export const revenue = async (tutorId)=>{
    try {
        const fetchrevenue = await tutorApi.post("/fetchRevenue", {tutorId})
        console.log(fetchrevenue.data ,  "reviewdata")
        return fetchrevenue.data.revenue;
        
    } catch (error) {
        console.log(error)
        throw error;
        
    }
}