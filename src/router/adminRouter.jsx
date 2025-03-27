import { Route, Routes } from "react-router-dom";
import Dashboard from "../Components/admin/admindashboard";
import AdminRegistrationForm from "../Components/admin/adminsignup";
import AdminPrivateRoute from "../Components/admin/adminPrivateRoute";
import LoginPage from "../Components/admin/adminSignIn";
import DashboardMain from "../generalParts/admindashboard/dashboardMain";
import StudentTable from "../generalParts/admindashboard/StudentTable";
import ViewApplication from "../generalParts/admindashboard/viewApplication";
import TutorsTable from "../generalParts/admindashboard/tutorsTAble";
import PviewApplication from "../generalParts/admindashboard/higherOrder/PviewApplication";
import Category from "../generalParts/category/categories";
import Order from "../Components/admin/order";
import AdminCourses from "../Components/admin/adminCourses";
import AdminRevenue from "../Components/admin/adminRevenue";




export default function adminRouter(){


return (
    <> 
<Routes>
    <Route path="/register" element={<AdminRegistrationForm/>}/> 

    <Route path={"/login"} element={<LoginPage/>}/>''
    
    <Route  element={<AdminPrivateRoute/>}> 

    <Route path="/" element={<Dashboard/>}> 
    <Route index element={<DashboardMain/>} />
    <Route path="students" element={<StudentTable/>}> </Route>
    <Route path="tutors" element={<TutorsTable/>} ></Route>
    <Route path="viewApplication" element={<PviewApplication/>}> </Route>
    <Route path="categories" element={<Category/>}></Route>
    <Route path="orders" element={<Order/>}></Route>
    <Route path="courses" element={<AdminCourses/>}></Route>
    <Route path="revenue" element={<AdminRevenue/>}></Route>
    </Route>
    
    </Route>

</Routes>
</>
)

}