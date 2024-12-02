import { NavLink } from 'react-router-dom';
import Aside from '../../generalParts/admindashboard/aside';


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <header className="bg-gray-700 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <NavLink to={"/admin/logout"} className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
            Logout
          </NavLink>
        </div>
      </header>

  
      <div className="flex">
        <Aside />

        <main className="flex-1 p-8">
        
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Revenue</h3>
              <p className="text-2xl font-semibold mt-2">₹2100000</p>
            </div>

          
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Courses</h3>
              <p className="text-2xl font-semibold mt-2">65</p>
            </div>

         
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Tutors</h3>
              <p className="text-2xl font-semibold mt-2">12</p>
            </div>

           
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Students</h3>
              <p className="text-2xl font-semibold mt-2">252</p>
            </div>
          </div>

          {/* Uncomment and pass Chart component if needed */}
          {/* <Chart
              data={data}
              activeRange={activeRange}
              timeRanges={timeRanges}
              handleRangeChange={handleRangeChange}
            /> */}
        </main>
      </div>
    </div>
  );
}
