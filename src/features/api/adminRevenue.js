import { adminApi } from "../../axios/axiosInstance"

export const adminRevenue = async()=>{
  try {
    const revenue = await adminApi.get("/adminRevenue")

    return revenue.data.revenue;
    
  } catch (error) {
    console.log(error)
    throw error
    
  }
}