import { NavLink } from 'react-router-dom';
import Aside from '../../generalParts/admindashboard/aside';
import AdminHeader from '../../generalParts/admindashboard/adminHeader';
import DashboardMain from '../../generalParts/admindashboard/dashboardMain';
import { Outlet } from 'react-router-dom';


export default function Dashboard() {



  return (
    <div className="min-h-screen bg-gray-100">

      <AdminHeader heading={"AdminDashboard"} /> 
      
      

  
      <div className="flex">
        <Aside />

        {/* <DashboardMain></DashboardMain> */}
        <Outlet></Outlet>

        
      </div>
    </div>
  );
}
