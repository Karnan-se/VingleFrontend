import { userApi } from "../../axios/axiosInstance"

export const isOrderCompleated = async (courseId, userId)=>{
    const isOrder = await userApi.post("/isorderCompleated",{courseId, userId});
    console.log(isOrder.data)
    return isOrder.data
}

export const allUserOrders = async (userId)=>{
    const isOrder = await userApi.post("/alluserOrder",{userId})
    console.log(isOrder.data ,  "jhwbfkj bkjwndkj jbwekjf je dkew kdj ewkd ")
    return (isOrder.data)
}