
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "../Components/tutor/tutorSignup";
import LoginPage from "../Components/tutor/tutorSignin";
import TutorDashboard from "../Components/tutor/tutordashboard";
import DashboardMain from "../generalParts/tutordashboard/dashboardMain";


function TutorLogin(){
    return (
        <Routes>
    <Route path="/" element={<TutorDashboard/>}>
    <Route index element={<DashboardMain/>} />
    <Route path="profile" element={<DashboardMain/>} />
    <Route path="courses" element={<DashboardMain/>} />
    </Route>

    <Route path= "/login" element={<LoginPage/>}></Route>
    <Route path="/register" element={<RegistrationForm/>}></Route>
       </Routes>

    )
}
export default TutorLogin




