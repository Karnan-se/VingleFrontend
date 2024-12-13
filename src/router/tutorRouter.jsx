
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "../Components/tutor/tutorSignup";
import LoginPage from "../Components/tutor/tutorSignin";


function TutorLogin(){
    return (
        <Routes>
    <Route path="/dashboard" element={<RegistrationForm/>}></Route>
    <Route path= "/login" element={<LoginPage/>}></Route>
    <Route path="/register" element={<RegistrationForm/>}></Route>
       </Routes>

    )
}
export default TutorLogin




