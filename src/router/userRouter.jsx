import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "../Components/user/signup.jsx";
import LoginPage from "../Components/user/signin.jsx";
import UserPrivateRoute from "../Components/user/userProtectedRoute.jsx";
import LandingPage from "../Components/user/LandingPage.jsx";
import UserOtpPage from "../Components/user/signupotp.jsx";
import ProfilePage from "../Components/user/profile.jsx";
import AddPhoto from "../Components/user/photo.jsx";
import PhotoMain from "../generalParts/profile/photoMain.jsx";
import ProfileMain from "../generalParts/profile/profileMain.jsx";
import CourseMain from "../generalParts/profile/courseMain.jsx";
import ForgotPassword from "../Components/user/forgotPassword.jsx";
import ForgotOtpPage from "../Components/user/forgotOTP.jsx";




function UserRouter(){

    return (
        <>
        
            <Routes>
                <Route path="/register" element={<RegistrationForm/>} />
                <Route path="/otp" element={<UserOtpPage/>} />
                
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/ForgotPassword" element={<ForgotPassword/>}></Route>
                <Route path="forgotpassword/otp" element={<ForgotOtpPage/>}></Route>
                
               <Route element={<UserPrivateRoute/>}> 
                <Route path="/" element={<LandingPage/>} />

                <Route path="/profile" element={<ProfilePage/>}>
                <Route index element={<ProfileMain/>}></Route>
                <Route path="/profile/photo" element={<PhotoMain/>}/>
                <Route path="/profile/course"  element={<CourseMain/>} />
                </Route>

                
                
                </Route> 
   
            </Routes>
    
        </> 
    )
}

export default UserRouter