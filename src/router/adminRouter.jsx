import { Route, Routes } from "react-router-dom";
import Dashboard from "../Components/admin/admindashboard";
import AdminRegistrationForm from "../Components/admin/adminsignup";
import AdminPrivateRoute from "../Components/admin/adminPrivateRoute";
import LoginPage from "../Components/admin/adminSignIn";




export default function adminRouter(){


return (
    <> 
<Routes>
    <Route path="/register" element={<AdminRegistrationForm/>}/> 

    <Route path={"/login"} element={<LoginPage/>}/>
    <Route  element={<AdminPrivateRoute/>}> 
    <Route path="/admindashboard" element={<Dashboard/>}/>
    
    </Route>

</Routes>
</>
)

}