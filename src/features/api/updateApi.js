import { userApi } from "../../axios/axiosInstance"
import { tutorApi } from "../../axios/axiosInstance"

const update =(api)=>{
    
    return async(values)=>{
        try {
        const response = await api.post("update", {user:values},{ withCredentials: true })
        console.log(response.data.data)
        return response.data.data;
            
        } catch (error) {
            console.error(error.response?.data?.error?.message || "Unexpected Error");
            swal({
            icon: "error",
            text: error.response?.data?.error?.message || "Unexpected Error",
            })
            
        }
        


    }
}


export const userUpdate = update(userApi);
export const tutorUpdate = update(tutorApi)