import Navbar from "../../generalParts/landipage/Navbar"
import CourseDetail from "../../generalParts/userCourse/courseDetail"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import {loadStripe} from  "@stripe/stripe-js"
const PublishableKey = import.meta.env.VITE_Publishable_key
const stripePromise = loadStripe(PublishableKey)
import {Elements} from "@stripe/react-stripe-js"

export default function  CourseDetails(){

    const dispatch = useDispatch()

    const userInfo = useSelector((state)=> state.user.userInfo)

    
    
    return(

              <div className="min-h-screen bg-white">
              <Navbar />
            <Elements stripe={stripePromise}>
            <CourseDetail userInfo={userInfo}/>


            </Elements >
              

              </div>
              


        
    )
}