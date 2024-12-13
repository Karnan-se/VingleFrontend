import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminPrivateRoute() {
    const adminInfo = useSelector((state) => state.admin.adminInfo);
    console.log(adminInfo, "adminInfo")

    return adminInfo ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
