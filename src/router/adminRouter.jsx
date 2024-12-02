import { Route, Routes } from "react-router-dom";
import Dashboard from "../Components/admin/admindashboard";



export default function adminRouter(){


return (
    <> 
<Routes>
    <Route path="/admindashboard" element={<Dashboard/>}>

    </Route>
</Routes>
</>
)

}