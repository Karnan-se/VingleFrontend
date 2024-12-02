import axios from "axios"

const axiosBaseConfig = axios.create({
    baseURL : 'http://localhost:3000',
    timeout:10000,
    withCredentials:true,
})

export const userApi = axios.create({
    ...axiosBaseConfig,
    baseURL:`http://localhost:3000/user`
})

export const adminApi = axios.create({
    ...axiosBaseConfig,
    baseURL : `${axiosBaseConfig.baseURL}/admin`
})
export const tutorApi = axios.create({
    ...axiosBaseConfig,
    baseURL:`${axiosBaseConfig.baseURL}/tutor`
})
