import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "../Components/user/signup.jsx";
import LoginPage from "../Components/user/signin.jsx";
import UserPrivateRoute from "../Components/user/userProtectedRoute.jsx";
import LandingPage from "../Components/user/LandingPage.jsx";




function UserRouter(){

    return (
        <>
        
            <Routes>
                <Route path="/register" element={<RegistrationForm/>} />
                <Route path="/login" element={<LoginPage/>}/>
               <Route element={<UserPrivateRoute/>}> 
                <Route path="/" element={<LandingPage/>} />
                
                </Route> 
   
            </Routes>
    
        </> 
    )
}

export default UserRouter