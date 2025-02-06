import { Outlet, useOutletContext } from "react-router-dom"
import Sidebar from "../../generalParts/tutordashboard/sidebar"
import TutorNavbar from "../../generalParts/tutordashboard/TutorNavbar"
import { useSelector } from "react-redux"
import { tutorUpdate } from "../../features/api/updateApi"
import { setTutorCredentials } from "../../features/authSlice"




export default function TutorDashboard() {

  const tutorInfo = useSelector((state)=> state.tutor.tutorInfo)
  const onlineUsers = useOutletContext()
  

  

  return (
    
      
      <main className="flex-1">
        <div>
          <TutorNavbar/>

        </div>
        <div className="flex ">
      <Sidebar />
      
      <div className="w-full">

     
      <Outlet context={{userUpdate : tutorUpdate, userDetail:tutorInfo, setUserCredentials: setTutorCredentials,onlineUsers}}/>
      </div>
      </div>
        
      </main>
  
  )
}

