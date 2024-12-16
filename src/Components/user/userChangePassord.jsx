import CreatePassword from "../../generalParts/password/createpassword";
import { userCreatePassword } from "../../features/api/createpassword";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { setUserCredentials } from "../../features/authSlice";
import {useDispatch} from 'react-redux';




export default function UserCreatePassword(){


    const location = useLocation();
    const data = location.state?.data;
    const dispatch = useDispatch()
    const navigate = useNavigate()
   


    const changePassword = async (values) => {
        console.log("Submitted values:", values);
        const {password1, password2} = values
        
        
        
        try {
          const response = await  userCreatePassword({emailAddress:data.emailAddress, password:password1})
          dispatch(setUserCredentials(response))
          navigate("/", { replace: true })
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