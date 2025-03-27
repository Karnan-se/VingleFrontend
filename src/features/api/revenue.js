import { adminApi, tutorApi } from "../../axios/axiosInstance";


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

export const adminRevenue  =  async()=>{
    try {
        const adminRevenue = await adminApi.get("/fetchadminRevenue")
        return adminRevenue.data.revenue
    } catch (error) {
        console.log(error)
        throw error
        
    }
}