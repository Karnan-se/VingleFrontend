
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "../Components/tutor/tutorSignup";
import LoginPage from "../Components/tutor/tutorSignin";
import TutorDashboard from "../Components/tutor/tutordashboard";
import DashboardMain from "../generalParts/tutordashboard/dashboardMain";
import TutorProtectedRoute from "../Components/tutor/tutorPrivateRoute";
import ProfilePage from "../generalParts/tutorprofilePage/editApplication";

function TutorLogin(){
    return (
        <Routes>
            <Route element={<TutorProtectedRoute />}>  
    <Route path="/" element={<TutorDashboard/>}>
    <Route index element={<DashboardMain/>} />
    <Route path="profile" element={<ProfilePage/>} />
    <Route path="courses" element={<DashboardMain/>} />
    </Route>
    </Route>

    <Route path= "/login" element={<LoginPage/>}></Route>
    <Route path="/register" element={<RegistrationForm/>}></Route>
       </Routes>

    )
}
export default TutorLogin




