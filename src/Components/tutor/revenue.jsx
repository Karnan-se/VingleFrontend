
import { useSelector } from "react-redux"
import RevenueTable from "../../generalParts/tutorRevenue/revenueTable"
import { useEffect } from "react"
import { revenue } from "../../features/api/revenue"
import { useState } from "react"





// id: 1,
// name: "MERN Stack",
// thumbnail: "/placeholder.svg?height=40&width=40",
// students: 100,
// rate: 799,
// uploadedDate: "17-02-2024",
// category: "Technical",
// totalRevenue: 54000,




export default function RevenuePage(){
    const [revenueData , setRevenueData] = useState()

    const tutorInfo = useSelector((state)=> state.tutor.tutorInfo)

    useEffect(()=>{
        if(!tutorInfo) return 

       async function fetchRevenue(){
        const revenueDatas = await revenue(tutorInfo._id)
        console.log(revenueDatas , "revenueData")
        setRevenueData(revenueDatas)

      }
      fetchRevenue()
        
    
    },[])
    

   return(
    <>
    {revenueData && (
         <RevenueTable revenueData={revenueData}/>

    )
    }
   
    </>
   )
}