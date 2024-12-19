import { Card } from "@nextui-org/card"
import { Tabs, Tab } from "@nextui-org/tabs"
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

export default function DashboardMain(){
    const data = [
        { name: 'Jan', income: 4000 },
        { name: 'Feb', income: 3000 },
        { name: 'Mar', income: 5000 },
        { name: 'Apr', income: 2780 },
        { name: 'May', income: 1890 },
        { name: 'Jun', income: 2390 },
        { name: 'Jul', income: 3490 },
      ]

    return(
        <>
        
        <div className="bg-slate-50-700 p-4 text-center">
          <h1 className="text-xl font-semibold text-black">Dashboard</h1>
        </div>

       
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
          <Card className="p-6 border rounded-sm shadow-md">
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="text-2xl font-bold">₹2100000</div>
          </Card>
          
          <Card className="p-6 border shadow-md">
            <div className="text-sm text-gray-500">Total Courses</div>
            <div className="text-2xl font-bold">65</div>
          </Card>
          
          <Card className="p-6 border shadow-md">
            <div className="text-sm text-gray-500">Total Students</div>
            <div className="text-2xl font-bold">252</div>
          </Card>
        </div>

     
        <Card className="mx-6 p-6 border shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Market Overview</h2>
            <Tabs 
              aria-label="Options"
              color="warning"
              variant="solid"
            >
              <Tab key="all" title="ALL" />
              <Tab key="1m" title="1M" />
              <Tab key="6m" title="6M" />
              <Tab key="1y" title="1Y" />
              <Tab key="ytd" title="YTD" />
            </Tabs>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#F5A524" 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        </>
    )
}