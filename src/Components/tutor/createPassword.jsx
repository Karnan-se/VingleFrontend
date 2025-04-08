import CreatePassword from "../../generalParts/password/createpassword";
import { tutorCreatePassword } from "../../features/api/createpassword";
import {  useLocation, useNavigate } from "react-router-dom";






export default function TutorCreatePassword(){


    const location = useLocation();
    const data = location.state?.data;
  
    const navigate = useNavigate()
   


    const changePassword = async (values) => {
        console.log("Submitted values:", values);
        const {password1, password2} = values
        
        
        
        try {
          const response = await  tutorCreatePassword({emailAddress:data.emailAddress, password:password1})
        
          navigate("/tutor", { replace: true })
          console.log(response)

          
        } catch (error) {
          console.log(error)
        }
    }
          
        

    return(
        <>
        <CreatePassword  changePassword={changePassword}/>
        </>
    )
}