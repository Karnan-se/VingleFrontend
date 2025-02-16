import { useEffect, useState } from "react";
import Chart from "./chart";
import { revenue } from "../../features/api/revenue";



export default function DashboardMain(){

 

  const generateData = (days) => {
    return Array.from({ length: days }, (_, i) => ({
      date: `Day ${i + 1}`,
      income: Math.floor(Math.random() * 50000) + 10000
    }));
  };
  
  const timeRanges = {
    ALL: 90,
    '1M': 30,
    '6M': 180,
    '1Y': 365,
    YTD: Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24))
  };
  
  
  
    const [activeRange, setActiveRange] = useState('ALL');
    const [data, setData] = useState(() => generateData(timeRanges['ALL']));
  
    const handleRangeChange = (range) => {
      setActiveRange(range);
      setData(generateData(timeRanges[range]));
    };
  



    return (
        <>

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

        <Chart
            data={data}
            activeRange={activeRange}
            timeRanges={timeRanges}
            handleRangeChange={handleRangeChange}
          />
      </main>
        </>
    )
}