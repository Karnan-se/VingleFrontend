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
import ForgotOtpPage from "../Components/user/forgotOTP.jsx";
import UserCreatePassword from "../Components/user/userChangePassord.jsx";
import PreventBackNavigation from "../features/navigation/backNavigation.jsx";
import InstructorApplicationForm from "../Components/tutor/tutorApplication.jsx";
import CourseDetails from "../Components/user/courseDetails.jsx";

import {loadStripe} from  "@stripe/stripe-js"
import {Elements, CardElement , useStripe, useElements} from "@stripe/react-stripe-js"
const PublishableKey = import.meta.env.VITE_Publishable_key
const stripePromise = loadStripe(PublishableKey)

import ThankYouPage from "../generalParts/thankyou/success.jsx";
import StartLearning from "../Components/user/StartLearning.jsx";
import ChatAndVIdeoCall from "../Components/user/ChatvideoCall.jsx";
import VideoCall from "../generalParts/chatAndvideocall/videocall.jsx";
import RevenuePage from "../Components/tutor/revenue.jsx";
import HorizontalNonLinearStepper from "../generalParts/trialCourse/courseStepper.jsx";
import CourseContext from "../generalParts/trialCourse/ContextCourse.jsx";
import TrailAddCourse from "../Components/tutor/trialAddCourse.jsx";
import PdfWrapper from "../Components/context/pdfRenderContext.jsx";


function UserRouter(){

    return (
        <>
        
            <Routes>
                <Route path="/register" element={<RegistrationForm/>} />
             
                
                <Route path="/login" element={<LoginPage/>}/>
                
                
                <Route path="/ForgotPassword" element={<PreventBackNavigation><ForgotPassword/></PreventBackNavigation>}></Route>
                <Route path="forgotpassword/otp" element={<PreventBackNavigation><ForgotOtpPage/></PreventBackNavigation>}></Route>
                <Route path="/otp" element={<PreventBackNavigation><UserOtpPage/></PreventBackNavigation>} />
                <Route path="/createpassword" element={<PreventBackNavigation><UserCreatePassword/></PreventBackNavigation>}></Route>
              
                
               <Route element={<UserPrivateRoute/>}> 
                <Route path="/" element={<LandingPage/>} />

                <Route path="/profile" element={<ProfilePage/>}>
                <Route index element={<ProfileMain/>}></Route>
                <Route path="/profile/photo" element={<PhotoMain/>}/>
                
                <Route path="/profile/course"  element={<PdfWrapper><CourseMain/></PdfWrapper>} />
                
                </Route>
                <Route path="/courseDetail" element={<Elements stripe={stripePromise}>  <CourseDetails/>   </Elements>  }></Route>
                <Route path="/beaInstructor"  element={<InstructorApplicationForm/>}></Route>
                <Route path="/success" element={<ThankYouPage/>}></Route>
                <Route path="/StartLearning" element={<StartLearning/>}></Route>
                <Route path="/chatInterface" element={<ChatAndVIdeoCall/>}/>
                <Route path="/VideoCall" element={<VideoCall/>}></Route>

              
                <Route path ="/trialStepper" element={<TrailAddCourse />} />
        
               
               

                </Route> 
   
            </Routes>
    
        </> 
    )
}

export default UserRouter