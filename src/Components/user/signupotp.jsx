import OTPVerification from "../../generalParts/OtpPage.jsx";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../axios/axiosInstance.js";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../features/authSlice.jsx";


export default function userOtpPage(){
    const LoginRoute = "/login"
    const dispatch = useDispatch()
    

    const navigate = useNavigate("")

    
  const handleSubmit = async (otp) => {
  
    console.log("submitted")
    const userInfo=localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo") ) : ""
    const payload = {userDetails:userInfo, otp }
  try {
    const verifyUser  = await userApi.post("/verifyUser", {payload}).then((data)=>{
      console.log(data)
      console.log(data.data.data.isVerfied)
      if(data.data.data.isVerfied == true){
        dispatch(setUserCredentials(data.data.data))
        navigate("/", {replace:true})
       
      }
      console.log(data, "verified")
    })
    
  } catch (error) {
    console.log(error)
    swal({
      icon:"error",
      text:"Invalid OTP"
    })
    
  }
  

    
    console.log('OTP submitted:', otp)
  }

    return (
        <>
        <OTPVerification login={LoginRoute} handleSubmit={handleSubmit}/>
        </>
    )
}