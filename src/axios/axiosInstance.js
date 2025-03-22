import axios from "axios"



const axiosBaseConfig = axios.create({
    baseURL : 'https://api.vingle.shop',
    timeout:10000,
    withCredentials:true,
})

export const userApi = axios.create({
    ...axiosBaseConfig,
    baseURL:`https://api.vingle.shop/user`,
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
    baseURL : `https://api.vingle.shop/admin`,
    withCredentials:true
})
export const tutorApi = axios.create({
    ...axiosBaseConfig,
    baseURL:`https://api.vingle.shop/tutor`,
    withCredentials:true
})
