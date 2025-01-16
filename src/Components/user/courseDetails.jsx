import Navbar from "../../generalParts/landipage/Navbar"
import CourseDetail from "../../generalParts/userCourse/courseDetail"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"

export default function  CourseDetails(){

    const dispatch = useDispatch()

    const userInfo = useSelector((state)=> state.user.userInfo)

    
    
    return(

              <div className="min-h-screen bg-white">
              <Navbar />

              <CourseDetail userInfo={userInfo}/>
              </div>
              


        
    )
}