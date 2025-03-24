import { userApi } from "../../axios/axiosInstance";
import { adminApi } from "../../axios/axiosInstance";
import { tutorApi } from "../../axios/axiosInstance";




const login = (api) => {
    return async (values) => {
      try {
        const response = await api.post("/login", { user: values } );
        console.log(response.data.data);
        return response.data.data; 
      } catch (error) {
        console.error(error.response?.data?.error?.message || "Unexpected Error");
        swal({
          icon: "error",
          text: error.response?.data?.error?.message || "Unexpected Error",
        });
        throw error; 
      }
    };
  };
  

  export const userLogin = login(userApi);
  export const adminLogin = login(adminApi);
  export const tutorLogin = login(tutorApi);
  