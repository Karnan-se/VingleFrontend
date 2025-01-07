
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "../Components/tutor/tutorSignup";
import LoginPage from "../Components/tutor/tutorSignin";
import TutorDashboard from "../Components/tutor/tutordashboard";
import DashboardMain from "../generalParts/tutordashboard/dashboardMain";
import TutorProtectedRoute from "../Components/tutor/tutorPrivateRoute";
import ProfileMain from "../generalParts/profile/profileMain";
import CourseTable from "../generalParts/tutorprofilePage/coursetable";
import { CourseCreator } from "../generalParts/course/CourseCreator";

function TutorLogin(){
    return (
        <Routes>
            <Route element={<TutorProtectedRoute />}>  
    <Route path="/" element={<TutorDashboard/>}>
    <Route index element={<DashboardMain/>} />
    <Route path="profile" element={<ProfileMain/>} />
    <Route path="courses" element={<CourseTable/>} />
    <Route path="courseCreate" element={<CourseCreator/>}></Route>
    </Route>
    </Route>

    <Route path= "/login" element={<LoginPage/>}></Route>
    <Route path="/register" element={<RegistrationForm/>}></Route>
    
       </Routes>

    )
}
export default TutorLogin




