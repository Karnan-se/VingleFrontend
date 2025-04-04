import { tutorApi } from "../../axios/axiosInstance"
import swal from "sweetalert"
import { toast } from "sonner"
import { showSuccessmessage } from "../../helper/toastHelper"


export const createCourse = async (form) =>{
 try {

    const response = await tutorApi.post("/createCourse",{form})
      console.log(response , "response")
      if(response){

        console.log(response.data.create)
     
        // swal({
        //   icon:"success",
        //   title:"Success",
        //   text:"course Saved Sucessfully",
        // })
        
        showSuccessmessage("course Created Successfully")
        return response.data.create
       
    }
    
 } catch (error) {
    console.log(error)

    throw error
    
 }
}