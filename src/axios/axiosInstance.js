import axios from "axios"


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
export const tutorApi = axios.create({
    ...axiosBaseConfig,
    baseURL:`${baseurl}/tutor`,
    withCredentials:true
})
