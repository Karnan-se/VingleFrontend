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

const getPaginatedCourse = (api)=>{
  return async(pageNumber = 1 , search , filterChange , tutorId)=>{
   try {
    const response = await api.get("/paginatedCourse", {params:{pageNumber , search , filterChange , tutorId}})
    console.log(response)
    const {course , totalCourse} = response.data
    return response.data
    
   } catch (error) {
    console.log(error)
    throw error
    
   }
  }
}

export const adminOrder = getOrder(adminApi)
export const userOrder = getOrder(tutorApi)

export const adminPaginatedStudent = getPaginatedStudent(adminApi)
export const adminPaginatedCourse = getPaginatedCourse(adminApi)



