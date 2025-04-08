
import { adminApi } from "../../../../axios/axiosInstance"

const getPaginatedTutors = (api)=>{

    return  async (pageNumber =1  , search = "" , filterChange) =>{
      try {
        const response  = await api.get("/paginationTutors", {params:{pageNumber , search , filterChange}})  
        
        console.log(response.data ,  "Students")
        return response.data.tutors
        
      } catch (error) {
        console.log(error)
        
      }
  
    }
   
  
  }

  export const adminPaginatedTutors = getPaginatedTutors(adminApi)