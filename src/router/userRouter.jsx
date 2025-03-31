import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "../Components/user/signup.jsx";
import LoginPage from "../Components/user/signin.jsx";
import UserPrivateRoute from "../Components/user/userProtectedRoute.jsx";
import LandingPage from "../Components/user/LandingPage.jsx";
import UserOtpPage from "../Components/user/signupotp.jsx";
import ProfilePage from "../Components/user/profile.jsx";
import PhotoMain from "../generalParts/profile/photoMain.jsx";
import ProfileMain from "../generalParts/profile/profileMain.jsx";
import CourseMain from "../generalParts/profile/courseMain.jsx";
import ForgotPassword from "../Components/user/forgotPassword.jsx";
import UserCreatePassword from "../Components/user/userChangePassord.jsx";
import PreventBackNavigation from "../features/navigation/backNavigation.jsx";
import InstructorApplicationForm from "../Components/tutor/tutorApplication.jsx";
import CourseDetails from "../Components/user/courseDetails.jsx";
import ForgotOtpPage from  "../Components/user/forgototp.jsx"

import {loadStripe} from  "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
const PublishableKey = import.meta.env.VITE_Publishable_key
const stripePromise = loadStripe(PublishableKey)

import ThankYouPage from "../generalParts/thankyou/success.jsx";
import StartLearning from "../Components/user/StartLearning.jsx";
import ChatAndVIdeoCall from "../Components/user/ChatvideoCall.jsx";
import VideoCall from "../generalParts/chatAndvideocall/videocall.jsx";
import TrailAddCourse from "../Components/tutor/trialAddCourse.jsx";
import PdfWrapper from "../Components/context/pdfRenderContext.jsx";
import Courses from "../Components/user/courses.jsx";
import TutorsDetails from "../Components/user/Tutors.jsx";
import Certificate from "../Components/user/certificate.jsx";
import AboutUs from "../Components/user/aboutUs.jsx";
import { AnimatePresence } from "framer-motion";
import LoginAnimation from "../Components/animation/LoginAnimation.jsx";

function UserRouter(){

    return (
        <>
         <AnimatePresence  mode="wait">  
            <Routes>
                <Route path="/register" element={<RegistrationForm/>} />
             
                
                <Route path="/login" element={<LoginAnimation>  <LoginPage/></LoginAnimation>}/>
             
                
                
                <Route path="/ForgotPassword" element={<PreventBackNavigation><ForgotPassword/></PreventBackNavigation>}></Route>
                <Route path="/forgotpassword/otp" element={<ForgotOtpPage/>}></Route>
                <Route path="/otp" element={<PreventBackNavigation><UserOtpPage/></PreventBackNavigation>} />
                <Route path="/createpassword" element={<PreventBackNavigation><UserCreatePassword/></PreventBackNavigation>}></Route>
              
                <Route path="/" element={<LoginAnimation><LandingPage/> </LoginAnimation> } />
               <Route element={<UserPrivateRoute/>}> 
             
                <Route path="/courses" element={<Courses/>}></Route>

                <Route path="/profile" element={<ProfilePage/>}>
                <Route index element={<ProfileMain/>}></Route>
                <Route path="/profile/photo" element={<PhotoMain/>}/>
                
                <Route path="/profile/course"  element={<PdfWrapper><CourseMain/></PdfWrapper>} />
                <Route path="/profile/certifications" element={<PdfWrapper><Certificate/></PdfWrapper>} />
                
                </Route>
                <Route path="/courseDetail" element={ <CourseDetails/>  }></Route>
                <Route path="/beaInstructor"  element={<InstructorApplicationForm/>}></Route>
                <Route path="/success" element={<ThankYouPage/>}></Route>
                <Route path="/StartLearning" element={<StartLearning/>}></Route>
                <Route path="/chatInterface" element={<ChatAndVIdeoCall/>}/>
                <Route path="/VideoCall" element={<VideoCall/>}></Route>
                <Route path="/tutors" element={<TutorsDetails/>}></Route>
                <Route path={"/about"} element={<AboutUs/>}/>
                
                

              
                <Route path ="/trialStepper" element={<TrailAddCourse />} />
        
               
               

                </Route> 
   
            </Routes>

            </AnimatePresence>
    
        </> 
    )
}

export default UserRouter