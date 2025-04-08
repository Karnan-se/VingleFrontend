import OTPVerification from "../../generalParts/otpPage.jsx";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../axios/axiosInstance.js";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";



export default function ForgotOtpPage(){
    const LoginRoute = "/login"
    

    const navigate = useNavigate("")
    const location = useLocation();
    const data = location.state?.data
   console.log(data , "this is data ")
   const userInfo ={
    emailAddress:data.emailAddress
   }


    
  const handleSubmit = async (otp) => {
  
    console.log("submitted")
    
    const payload = {userDetails:userInfo, otp }
  try {
    const verifyUser  = await userApi.post("/verifyUser", {payload}).then((data)=>{
    
      if(data.data.data){
        
        navigate("/createpassword", {state:{data:data.data.data}},  {replace:true})
       
      }
      console.log(data, "verified")
    })
    
  } catch (error) {
    console.log(error)
    toast.error(error.response?.data?.error?.message || "Unexpected Error",)
    
  }
  

    
    console.log('OTP submitted:', otp)
  }

    return (
        <>
        <OTPVerification login={LoginRoute} handleSubmit={handleSubmit}/>
        </>
    )
}
