import { tutorApi, userApi } from "../../axios/axiosInstance";
import { adminApi } from "../../axios/axiosInstance";

function createPassword(api){

    return async(values)=>{
        try {
            const response = await api.put("/changepassword", {user:values} , { withCredentials: true })
            console.log(response.data.data)
            
            return response.data.data; 
            
        } catch (error) {
            swal({
                icon: "error",
                text: error.response?.data?.error?.message || "Unexpected Error",
            })
            throw error;

            
        }
      


    }
}

export const userCreatePassword = createPassword(userApi)
export const tutorCreatePassword = createPassword(tutorApi)