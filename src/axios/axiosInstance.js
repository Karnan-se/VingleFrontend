import axios from "axios"

const axiosBaseConfig = axios.create({
    baseURL : 'http://localhost:3000',
    timeout:10000,
    withCredentials:true,
})

export const userApi = axios.create({
    ...axiosBaseConfig,
    baseURL:`http://localhost:3000/user`,
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
    baseURL : `http://localhost:3000/admin`,
    withCredentials:true
})
export const tutorApi = axios.create({
    ...axiosBaseConfig,
    baseURL:`http://localhost:3000/tutor`,
    withCredentials:true
})
