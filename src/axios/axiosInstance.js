import axios from "axios"
import { toast } from "sonner";



let environment = (import.meta.env.VITE_ENVIRONMENT) ?? "production"

let baseurl = environment == "development" ? "http://localhost:3000" :"https://api.vingle.shop"



const axiosBaseConfig = axios.create({
    baseURL : `${baseurl}`,
    timeout:600000,
    withCredentials:true,
})

export const userApi = axios.create({
    ...axiosBaseConfig,
    baseURL:`${baseurl}/user`,
    withCredentials:true
})
userApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 403) {
                console.log("userInfo going to be cleared")
                toast.error("Session Expired")
                localStorage.removeItem("userInfo");
                window.location.href = "/login";
                
            }
        }
        return Promise.reject(error); 
    }
);

export const adminApi = axios.create({
    ...axiosBaseConfig,
    baseURL : `${baseurl}/admin`,
    withCredentials:true
})
adminApi.interceptors.response.use((response)=> response , (error)=> {
    if(error.response){
        const status = error.response.status;
        if(status == 403){
            console.log("adminInfor going to be cleared")
            localStorage.removeItem("adminInfo")
            window.location.href = "/admin/login"
        }
    }
})


export const tutorApi = axios.create({
    ...axiosBaseConfig,
    baseURL:`${baseurl}/tutor`,
    withCredentials:true
})


tutorApi.interceptors.response.use((response)=> response , (error)=> {
    if(error.response){
        const status = error.response.status;
        if(status == 403){
            console.log("adminInfor going to be cleared")
            localStorage.removeItem("tutorInfo")
            window.location.href = "/tutor/login"
        }
    }
})
