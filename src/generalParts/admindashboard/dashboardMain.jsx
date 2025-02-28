import { useEffect, useState } from "react";
import Chart from "./chart";
import { revenue } from "../../features/api/revenue";
import { fetchAdminChart } from "../../features/api/fetchAdminChart";
import { adminRevenue } from "../../features/api/adminRevenue";

const timeRanges = {
  "ALL": 720,
  "1M": 30,
  "6M": 180,
  "1Y": 365,
};

const generateRevenueForAdmin = async (period) => {

  

  try {
    const now = new Date();
    let startDate;
    
    switch(period) {
      case 720:
        startDate = new Date(now.setMonth(now.getMonth() - 24));
        break;
      case 30:
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 180:
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case 365:
        startDate = new Date(now.setMonth(now.getMonth() - 12));
        break;
      default:
        throw new Error("Invalid period");
    }

    const revenueData = await fetchAdminChart(startDate);
    
    // Transform data based on period
    return transformRevenueData(revenueData, period);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const transformRevenueData = (data, period) => {
 
  const transformedData = data.reduce((acc, item) => {
    const dateKey = formatDate(item.day, period);
    if (!acc[dateKey]) {
      acc[dateKey] = { 
        date: dateKey,
        income: 0,
        count: 0 
      };
    }
    acc[dateKey].income += item.income;
    acc[dateKey].count++;
    return acc;
  }, {});

  
  return Object.values(transformedData)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

const formatDate = (day, period) => {
  const date = new Date();
  date.setDate(day);

  switch(period) {
    case 720:
      return date.toISOString().split('T')[0];
    case 365: 
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    case 180: 
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    case 30: 
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    default:
      return date.toISOString().split('T')[0];
  }
};

export default function DashboardMain() {
  const [activeRange, setActiveRange] = useState("ALL");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revenue , setRevenue] = useState()


  useEffect(()=>{
    const revenueDetails = async()=>{
      try {
        const reveue = await adminRevenue()
        console.log(reveue , "revenue")
        setRevenue(reveue)
        
      } catch (error) {
        console.log(error)
        
      }

    }
    revenueDetails()

  },[])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const revenueData = await generateRevenueForAdmin(timeRanges[activeRange]);
        setData(revenueData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeRange]);

  const handleRangeChange = (range) => {
    setActiveRange(range);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
     
      <main className="flex-1 p-8">

      {revenue && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Sales</h3>
            <p className="text-2xl font-semibold mt-2"> ₹{revenue.revenue}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">sales commission</h3>
            <p className="text-2xl font-semibold mt-2"> ₹{revenue.totalSales}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total course</h3>
            <p className="text-2xl font-semibold mt-2">{revenue.totalCourse}</p>
          </div>
          
         
        </div>
      )}

        <Chart
          data={data}
          activeRange={activeRange}
          timeRanges={timeRanges}
          handleRangeChange={handleRangeChange}
        />
      </main>
    </>
  );
}