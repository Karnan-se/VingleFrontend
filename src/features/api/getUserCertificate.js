import { userApi } from "../../axios/axiosInstance"
export const getUserCertificate =  async (userId) =>{
    try {
        const response = await userApi.get("/getUserCertificate", {params:{userId:userId}})
        console.log(response.data)
        return response.data.certificate;
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}