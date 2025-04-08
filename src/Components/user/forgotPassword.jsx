import ForgotPassword from "../../generalParts/forgotPassword/forgotPassword"
import { userEmailVerification } from "../../features/api/Emailverification"



export default function UserForgotPassword(){

  return(
    <>
      <ForgotPassword Emailverification ={userEmailVerification} otpPageLink={"/forgotpassword/otp"} />
    </>
  )
}