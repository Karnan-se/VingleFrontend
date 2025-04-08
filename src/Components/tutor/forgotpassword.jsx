import { TutorEmailVerification } from "../../features/api/Emailverification"
import ForgotPassword from "../../generalParts/forgotPassword/forgotPassword"


export default  function TutorForgotPassword(){
  return(
    <>
      <ForgotPassword Emailverification ={TutorEmailVerification} otpPageLink={"/tutor/forgotpassword/otp"}/>
    </>
  )
}