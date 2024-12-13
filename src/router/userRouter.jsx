import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "../Components/user/signup.jsx";
import LoginPage from "../Components/user/signin.jsx";
import UserPrivateRoute from "../Components/user/userProtectedRoute.jsx";
import LandingPage from "../Components/user/LandingPage.jsx";
import UserOtpPage from "../Components/user/otp.jsx";
import ProfilePage from "../Components/user/profile.jsx";
import AddPhoto from "../Components/user/photo.jsx";
import PhotoMain from "../generalParts/profile/photoMain.jsx";
import ProfileMain from "../generalParts/profile/profileMain.jsx";




function UserRouter(){

    return (
        <>
        
            <Routes>
                <Route path="/register" element={<RegistrationForm/>} />
                <Route path="/otp" element={<UserOtpPage/>} />
                
                <Route path="/login" element={<LoginPage/>}/>
                
               <Route element={<UserPrivateRoute/>}> 
                <Route path="/" element={<LandingPage/>} />
                <Route path="/profile" element={<ProfilePage/>}>
                <Route index element={<ProfileMain/>}></Route>
                <Route path="/profile/photo" element={<PhotoMain/>}/>
                </Route>
                
                </Route> 
   
            </Routes>
    
        </> 
    )
}

export default UserRouter