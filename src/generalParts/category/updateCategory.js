import { adminApi } from "../../axios/axiosInstance";
import { isValidCategory } from "./addcategory";



export const handleToggleBlock = async(category )=>{
    console.log(category)
    try {
        const updatedCategory = {...category, isBlocked:!category.isBlocked}
        const update = await adminApi.post("/updateCategory" , updatedCategory);
        return update.data.data
       

        
    } catch (error) {
        console.log(error)
    }
}
export const updateCategory =  async (category , categories)=>{

    if(!isValidCategory(category.name) || !isValidCategory(category.description)){
        swal({
            icon:"error",
            title:"error",
            text:"Validation Error"
        })
        return 
    }

    const isExist = Array.from(categories).find((cat)=> cat.name.toLowerCase() == category.name.toLowerCase());
    if(isExist){
        console.log("Exist");
        swal({
            icon:"error",
            title:"error",
            text:"Category Already Exists"
        })
        return 
    }
    try {
        const update = await adminApi.post("/updateCategory" , category);
        return update.data.data
        
        
    } catch (error) {
        throw error;
        
    }
}