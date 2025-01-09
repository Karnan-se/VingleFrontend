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
