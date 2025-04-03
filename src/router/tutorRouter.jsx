
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "../Components/tutor/tutorSignup";
import LoginPage from "../Components/tutor/tutorSignin";
import TutorDashboard from "../Components/tutor/tutordashboard";
import DashboardMain from "../generalParts/tutordashboard/dashboardMain";
import TutorProtectedRoute from "../Components/tutor/tutorPrivateRoute";
import ProfileMain from "../generalParts/profile/profileMain";
import CourseTable from "../generalParts/tutorprofilePage/coursetable";
import { CourseCreator } from "../generalParts/course/CourseCreator";
import EditCourse from "../generalParts/viewCourse/EditCourse";
import PhotoMain from "../generalParts/profile/photoMain";
import TChatAndVIdeoCall from "../Components/tutor/TChatAndVideoCall";
import VideoCall from "../generalParts/chatAndvideocall/videocall";
import RevenuePage from "../Components/tutor/revenue";
import TrailAddCourse from "../Components/tutor/trialAddCourse";
import { EfficientAddCourse } from "../Components/tutor/secondAddCourse";

function TutorLogin(){
    return (
        <Routes>
      
    <Route element={<TutorProtectedRoute />}>  
    <Route path="/" element={<TutorDashboard/>}>
    <Route index element={<DashboardMain/>} />
    <Route path="profile" element={<ProfileMain/>} />
    <Route path="courses" element={<CourseTable/>} />
    <Route path="photo" element={<PhotoMain/>} />
    <Route path="courseCreate" element={<EfficientAddCourse/>}></Route>
    <Route path="editCourse" element={<EditCourse/>}></Route>
    <Route path="chat" element={<TChatAndVIdeoCall/>}></Route>
    <Route path="/revenue" element={<RevenuePage/>} /> 
    </Route>
    </Route>

    <Route path= "/login" element={<LoginPage/>}></Route>
    <Route path="/register" element={<RegistrationForm/>}></Route>
    <Route path="/videocall" element={<VideoCall/>}></Route>
    <Route path="/effiecient" element={<EfficientAddCourse />}></Route>
    
       </Routes>
    )
}
export default TutorLogin




