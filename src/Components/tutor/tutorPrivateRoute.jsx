import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


export default function tutorProtectedRoute(){

    const tutorInfo = useSelector(state=> state.tutor.tutorInfo);

    const content = tutorInfo? <Outlet/>  : <Navigate to={"/login"}  replace/>

    return content
}