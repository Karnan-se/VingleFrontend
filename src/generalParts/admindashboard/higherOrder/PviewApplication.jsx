import { useEffect, useState } from "react";
import ViewApplication from "../viewApplication";
import { useLocation } from "react-router-dom"; 
import { adminApi } from "../../../axios/axiosInstance";
import { useNavigate } from "react-router-dom";




export default function PviewApplication(){

    const location  = useLocation();
    const tutors_id =  location?.state?._id
    const [applicationDetails, setapplicationDetails] = useState("")
    
    const navigate = useNavigate()

    useEffect(()=>{
        if(!location?.state?._id){
            navigate("/admin/tutors")
            
        }
        console.log(tutors_id)

    },[location, navigate])
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await adminApi.post("/tutorsApplication", {_id:tutors_id}) 
            console.log(response.data.applicationDetails)

            const applicationDetail = response.data.applicationDetails;
            setapplicationDetails(applicationDetail)

           
        }
        fetchData();
            

        
       
    },[])




    return (
        <ViewApplication application={applicationDetails} />
    )



}