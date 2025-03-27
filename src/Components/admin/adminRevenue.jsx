import { useState , useEffect } from "react"
import { adminRevenue } from "../../features/api/revenue"
import RevenueTable from "../../generalParts/tutorRevenue/revenueTable"



export default function AdminRevenue(){
    const [revenue , setRevenue] = useState()

    useEffect(()=>{
        const fetchRevenue = async ()=>{
        const revenue =  await adminRevenue()
        console.log(revenue);
        setRevenue(revenue)

        }
        

        fetchRevenue()

    },[])


    return (
        <>
        {revenue && (
            <RevenueTable revenueData={revenue} />
    


        )}

        </>
    )
}