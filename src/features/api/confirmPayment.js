import { userApi } from "../../axios/axiosInstance"



export const confirmPayment = async (price, courseName , courseImage)=>{
    console.log("api call ")
    try {
        const confirm = await userApi.post("/create-checkout-session",{price,courseName , courseImage })
        console.log(confirm.data)
        return confirm.data

        
    } catch (error) {
        console.log(error)
        throw error;
    }
}