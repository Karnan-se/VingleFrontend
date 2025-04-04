import { adminApi } from "../../axios/axiosInstance";
import { userApi } from "../../axios/axiosInstance";
import { tutorApi } from "../../axios/axiosInstance";




const Logout = (api) => {
  return async () => {
    try {
      const response = await api.get("/logout");
      
      console.log(response);
      return response
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const adminLogoutApi = Logout(adminApi);
export const userLogoutApi = Logout(userApi);
export const tutorLogoutApi = Logout(tutorApi);
