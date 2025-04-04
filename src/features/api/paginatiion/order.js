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


const searchOrder = (api)=>{
  return async(search , statusFilter)=>{
    try {
      const response  = await api.get("/searchOrder" , {params:{search , statusFilter}})
      console.log(response.data)
      return response.data
      
    } catch (error) {
      
    }
  }
}


export const adminOrder = getOrder(adminApi)
export const userOrder = getOrder(tutorApi)



