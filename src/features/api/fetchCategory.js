import { adminApi } from "../../axios/axiosInstance"


export const fetchCategory = async ()=>{
  
  
 try {
    const categoriesStored = await adminApi.get("/getCategories")
    const category =categoriesStored.data.data.map((category)=> ({ ...category, value:category.name,  }))
    console.log(category, "category")
    
    return category
    
 } catch (error) {
    console.log(error)
    throw error
    
 }

 }