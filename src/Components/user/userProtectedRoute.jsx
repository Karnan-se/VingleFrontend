import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoginPage from "./signin";
import { Navigate } from "react-router-dom";


export default function UserPrivateRoute(){

    

    const userInfo = useSelector(state=>state.user.userInfo)

    let component = userInfo? <Outlet/> : <Navigate to={"/login"} replace/>

    return (
        <>
        {component}
        </>
    )
}