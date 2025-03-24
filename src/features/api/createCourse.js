import { tutorApi } from "../../axios/axiosInstance"
import swal from "sweetalert"


export const createCourse = async (form) =>{
 try {
  for (const pair of form.entries()) {
    console.log(pair[0], pair[1]); 
}
    const response = await tutorApi.post("/createCourse",form)
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
    swal({
      icon:"success",
      title:"Success",
      text:"course Saved Sucessfully",
    })
    throw error
    
 }
}