import axios from "axios";

const axiosBaseConfig = axios.create({
    timeout: 10000,
    withCredentials: true,
});

export const userApi = axios.create({
    ...axiosBaseConfig,
    baseURL: "/api/user",  // 🔥 Now using relative path
});

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
    baseURL: "/api/admin",  // 🔥 Using relative path
});

export const tutorApi = axios.create({
    ...axiosBaseConfig,
    baseURL: "/api/tutor",  // 🔥 Using relative path
});
