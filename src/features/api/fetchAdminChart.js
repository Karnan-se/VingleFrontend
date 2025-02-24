import { adminApi } from "../../axios/axiosInstance"

export const fetchAdminChart = async  (startDate) =>{
    try {
        console.log(startDate , "startDate")
        const adminChartData =  await adminApi.get("/fetchAdminChart", {
            params: { startDate },
          });
          console.log(adminChartData.data.adminChart , "adminChartData")
          return adminChartData.data.adminChart;

    } catch (error) {
        console.log(error ,"error")
        throw error;
        
    }
}