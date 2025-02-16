import { Card } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { revenue, tutorsChart } from "../../features/api/revenue";
import { useSelector } from "react-redux";

export default function DashboardMain() {
  const [data, setData] = useState(); // Full data details fetched
  const [filteredData, setFilteredData] = useState(); // Data displayed in the chart
  const [selectedRange, setSelectedRange] = useState("all");
  const [revenueDetails, setRevenueDetails] = useState();

  const userInfo = useSelector((state) => state.tutor.tutorInfo);

  useEffect(() => {
    async function fetchRevenue() {
      const getRevenue = await revenue(userInfo._id);
      console.log(getRevenue, "getRevenue");
      setRevenueDetails(getRevenue);
    }
    fetchRevenue();
  }, []);

  useEffect(() => {
    async function fetchChartDetails() {
      const tutorchart = await tutorsChart();
      console.log(tutorchart);
      setData(tutorchart);
      setFilteredData(tutorchart); // Initially set full data
    }
    fetchChartDetails();
  }, []);

  useEffect(() => {
    console.log(filteredData, "filteredData");
  }, [filteredData]);

  if (!revenueDetails || !data) return;

  
  const filterChartData = (range) => {
    setSelectedRange(range);

    if (range === "all") {
      setFilteredData(data);
    } else {
      const now = new Date();
      let filtered = [];

      switch (range) {
        case "1m":
          filtered = data.filter((d) => new Date(d.date) >= new Date(now.setMonth(now.getMonth() - 1)));
          break;
        case "6m":
          filtered = data.filter((d) => new Date(d.date) >= new Date(now.setMonth(now.getMonth() - 6)));
          break;
        case "1y":
          filtered = data.filter((d) => new Date(d.date) >= new Date(now.setFullYear(now.getFullYear() - 1)));
          break;
        case "ytd":
          filtered = data.filter((d) => new Date(d.date).getFullYear() === new Date().getFullYear());
          break;
        default:
          filtered = data;
      }

      setFilteredData(filtered);
    }
  };

  return (
    <>
      <div className="bg-slate-50-700 p-4 text-center">
        <h1 className="text-xl font-semibold text-black">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
        <Card className="p-6 border rounded-sm shadow-md">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold">{revenueDetails.reduce((acc, rev) => acc + rev.totalRevenue, 0)}</div>
        </Card>

        <Card className="p-6 border shadow-md">
          <div className="text-sm text-gray-500">Total Courses</div>
          <div className="text-2xl font-bold">{revenueDetails.length}</div>
        </Card>

        <Card className="p-6 border shadow-md">
          <div className="text-sm text-gray-500">Total Students</div>
          <div className="text-2xl font-bold">{revenueDetails.reduce((acc, student) => acc + student.students, 0)}</div>
        </Card>
      </div>

      <Card className="mx-6 p-6 border shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Market Overview</h2>
          <Tabs
            aria-label="Options"
            color="warning"
            variant="solid"
            selectedKey={selectedRange}
            onSelectionChange={filterChartData}
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
            <LineChart data={filteredData}>
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#F5A524" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
}
