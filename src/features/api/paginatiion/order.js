import { adminApi } from "../../../axios/axiosInstance"
import { tutorApi } from "../../../axios/axiosInstance"

const getOrder =  (api)=>{
  return async(pageNumber = 1, search , filterChange)=>{
    try {
      const response = await api.get("/paginationOrder", {params:{pageNumber , search , filterChange}})
      console.log(response)
      return response.data
      
    } catch (error) {
      console.log(error)
      
    }
   

  }

}




const getPaginatedStudent = (api)=>{

  return  async (pageNumber =1  , search , filterChange) =>{
    try {
      const response  = await api.get("/paginationStudent", {params:{pageNumber , search , filterChange}})  
      console.log(response.data ,  "Students")
      const {students ,  totalStudents} = response.data 
      return {students , totalStudents}
      
    } catch (error) {
      console.log(error)
      
    }

  }
 

}





export const adminOrder = getOrder(adminApi)
export const userOrder = getOrder(tutorApi)

export const adminPaginatedStudent = getPaginatedStudent(adminApi)



