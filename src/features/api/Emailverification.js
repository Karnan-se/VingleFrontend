import { tutorApi, userApi } from "../../axios/axiosInstance"

const emailVerification = (api)=>{

    return async(values)=>{
        try {
            const response =await api.post("/sendotp" , {user:values} ,{ withCredentials: true })
            console.log(response)
            return response.data  
        } catch (error) {
            console.log(error)
            swal({
                icon: "error",
                text: error.response?.data?.error?.message || "Unexpected Error",
              });
            throw error
            
        }
       
    }

}

export const userEmailVerification = emailVerification(userApi)
export const TutorEmailVerification = emailVerification(tutorApi)


