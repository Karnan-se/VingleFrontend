import swal from 'sweetalert';
import { userApi } from "../../axios/axiosInstance";


const register = (userRoute) => {

  return async (values) => {
    try {
      const response = await userApi.post(userRoute, { user: values }, { withCredentials: false });
      console.log('API Response:', response.data);
      if(response.data && userRoute == "/userRegister"){
        console.log(response.data);
        return response.data.data
      }
    } catch (error) {
      console.error('Error:', error.response);
      swal({
        icon: "error",
        text: error.response?.data?.error?.message || "An unexpected error occurred",
      });
      throw error
    }
  };
};


export const submitUserDetail = register("/userRegister");
export const submitAdminDetail = register("/adminRegister");
export const submitTutorDetail = register("/tutorRegister");
