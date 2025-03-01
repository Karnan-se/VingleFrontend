import { userApi } from "../../axios/axiosInstance"


export const getprogress = async(userId, courseId)=>{
    try {
        const progress = await userApi.get("/getProgress", {
            params: { userId, courseId },
          });
          console.log(progress.data.progressPercentage , "progress")
          
          return progress.data.progressPercentage

        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}