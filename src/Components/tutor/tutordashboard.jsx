import { Outlet } from "react-router-dom"
import Sidebar from "../../generalParts/tutordashboard/sidebar"
import TutorNavbar from "../../generalParts/tutordashboard/TutorNavbar"
import { useSelector } from "react-redux"
import { tutorUpdate } from "../../features/api/updateApi"




export default function TutorDashboard() {

  const tutorInfo = useSelector((state)=> state.tutor.tutorInfo)
  console.log(tutorInfo, "TutorInfo")

  

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1">
      <TutorNavbar/>

      <Outlet context={{userUpdate : tutorUpdate}}/>
        
      </main>
    </div>
  )
}

