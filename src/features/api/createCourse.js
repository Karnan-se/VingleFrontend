import { tutorApi } from "../../axios/axiosInstance"
import swal from "sweetalert"


export const createCourse = async (form) =>{
 try {
    const response = await tutorApi.post("/createCourse",form,{
      withCredentials:true,
      headers : {
          "Content-Type": "multipart/form-data", 
      

      }
    } ,)
      console.log(response , "response")
      if(response){
     
        swal({
          icon:"success",
          title:"Success",
          text:"course Saved Sucessfully",
        })
       
    }
    
 } catch (error) {
    console.log(error)
    throw error
    
 }
}