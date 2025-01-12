import { Outlet } from "react-router-dom"
import Sidebar from "../../generalParts/tutordashboard/sidebar"
import TutorNavbar from "../../generalParts/tutordashboard/TutorNavbar"
import { useSelector } from "react-redux"
import { tutorUpdate } from "../../features/api/updateApi"
import { setTutorCredentials } from "../../features/authSlice"




export default function TutorDashboard() {

  const tutorInfo = useSelector((state)=> state.tutor.tutorInfo)
  

  

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1">
      <TutorNavbar/>

      <Outlet context={{userUpdate : tutorUpdate, userDetail:tutorInfo, setUserCredentials: setTutorCredentials}}/>
        
      </main>
    </div>
  )
}

