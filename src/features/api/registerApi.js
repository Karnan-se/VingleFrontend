import swal from 'sweetalert';
import { userApi } from "../../axios/axiosInstance";
import { adminApi } from '../../axios/axiosInstance';
import { tutorApi } from '../../axios/axiosInstance';


const register = (userRoute, api) => {

  return async (values) => {
    try {
      const response = await api.post(userRoute, { user: values }, { withCredentials: false });
      console.log('API Response:', response.data);
      if(response.data){
        console.log(response.data);
        return response.data.data
      }
    } catch (error) {
      console.error('Error:', error.response);
      console.log(error)
      swal({
        icon: "error",
        text: error.response?.data?.error?.message || "An unexpected error occurred",
      });
      throw error
    }
  };
};


export const submitUserDetail = register("/userRegister", userApi);
export const submitAdminDetail = register("/adminRegister", adminApi);
export const submitTutorDetail = register("/tutorRegister", tutorApi);
