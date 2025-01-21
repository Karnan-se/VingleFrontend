import { userApi } from "../../axios/axiosInstance";

export const isProgressTracked = async(userId, courseId)=>{
    const response = await userApi.get("/isprogressTracked", {params: { userId, courseId }, });
    console.log(response.data)
    return response.data;
}

export const createProgress = async (userId, courseId)=>{
    const response = await userApi.post("/createProgress",{userId, courseId} )
    return response.data
}