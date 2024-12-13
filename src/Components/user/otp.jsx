import OTPVerification from "../../generalParts/otpPage.jsx";


export default function userOtpPage(){
    const LoginRoute = "/login"

    return (
        <>
        <OTPVerification login={LoginRoute}/>
        </>
    )
}