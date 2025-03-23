import { useEffect } from "react"
import { useSelector } from "react-redux"






export default function Welcome(){
    
    const userInfo = useSelector((state)=> state.user.userInfo)


    return (
        <div className=" w-1/2">
            <div className=" flex flex-col md:flex-col lg:flex-row  xl:flex-row  "> 
            <div className="rounded-full bg-purple-200 w-16 h-16">
                <img src={userInfo.photo} alt="" className="object-cover w-16 h-16 rounded-full" />
            </div>
            <div className="p-3 size-60 font-bold flex items-center h-16">
                <p className=" items-center ">Welcome Back , {userInfo.firstName}  </p></div>
            </div>

        </div>
    )
}