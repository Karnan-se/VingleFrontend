import { adminApi } from "../../../axios/axiosInstance"
import { tutorApi } from "../../../axios/axiosInstance"

const getOrder =  (api)=>{
  return async(pageNumber = 1)=>{
    try {
      const response = await api.get("/paginationOrder", {params:{pageNumber}})
      console.log(response)
      return response.data
      
    } catch (error) {
      console.log(error)
      
    }
   

  }

}


export const adminOrder = getOrder(adminApi)
export const userOrder = getOrder(tutorApi)
