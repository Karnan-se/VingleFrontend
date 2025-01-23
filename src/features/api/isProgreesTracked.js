import { userApi } from "../../axios/axiosInstance";

export const isProgressTracked = async(userId, courseId , itemsId)=>{
    const response = await userApi.get("/isprogressTracked", {params: { userId, courseId , itemsId}, });
    console.log(response.data)
    return response.data;
}

export const createProgress = async (userId, courseId , itemsId)=>{
    const response = await userApi.post("/createProgress",{userId, courseId , itemsId} )
    return response.data
}


export const updateProgress = async (userId, courseId, itemId, percentageCompleted) => {
    try {
        const response = await userApi.post("/updateProgressPercentage" , {userId, courseId, itemId, percentageCompleted})
        
        console.log(response.data)
        
    } catch (error) {
        console.log(error)
        
    }
}