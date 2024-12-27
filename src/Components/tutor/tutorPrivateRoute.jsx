import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


export default function TutorProtectedRoute(){

    const tutorInfo = useSelector(state=> state.tutor.tutorInfo);

    const content = tutorInfo? <Outlet/>  : <Navigate to={"/tutor/login"}  replace/>

    return content
}