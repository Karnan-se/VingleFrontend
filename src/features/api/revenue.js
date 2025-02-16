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

export const tutorsChart = async()=>{
    try {
        const getchartDetails = await tutorApi.get("/tutorsChart")
        return getchartDetails.data.chart
    } catch (error) {
        console.log(error)
    
        
    }
}