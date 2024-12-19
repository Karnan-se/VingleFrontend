import { Outlet } from "react-router-dom"
import Sidebar from "../../generalParts/tutordashboard/sidebar"
import TutorNavbar from "../../generalParts/tutordashboard/TutorNavbar"



export default function TutorDashboard() {

  

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1">
      <TutorNavbar/>

      <Outlet/>
        
      </main>
    </div>
  )
}

