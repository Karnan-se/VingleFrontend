"use client"

import { Card } from "@nextui-org/card"
import { Tabs, Tab } from "@nextui-org/tabs"
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useState, useEffect } from "react"
import { revenue, tutorsChart } from "../../features/api/revenue"
import { useSelector } from "react-redux"

const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function DashboardMain() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedRange, setSelectedRange] = useState("all")
  const [revenueDetails, setRevenueDetails] = useState([])

  const userInfo = useSelector((state) => state.tutor.tutorInfo)

  useEffect(() => {
    async function fetchRevenue() {
      const getRevenue = await revenue(userInfo._id)
      setRevenueDetails(getRevenue)
    }
    fetchRevenue()
  }, [userInfo._id])

  useEffect(() => {
    async function fetchChartDetails() {
      const tutorchart = await tutorsChart()
      const sortedData = tutorchart.sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name))
      setData(sortedData)
      setFilteredData(sortedData)
    }
    fetchChartDetails()
  }, [])

  const filterChartData = (range) => {
    setSelectedRange(range)

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    let filtered = []

    switch (range) {
      case "1m":
        filtered = data.filter((d) => monthOrder.indexOf(d.name) === currentMonth)
        break
      case "6m":
        const sixMonthsAgo = (currentMonth - 5 + 12) % 12
        filtered = data.filter((d) => {
          const monthIndex = monthOrder.indexOf(d.name)
          return monthIndex >= sixMonthsAgo || monthIndex <= currentMonth
        })
        break
      case "1y":
        filtered = data
        break
      case "ytd":
        filtered = data.filter((d) => monthOrder.indexOf(d.name) <= currentMonth)
        break
      default:
        filtered = data
    }

    setFilteredData(filtered)
  }

  if (!revenueDetails.length || !data.length) return <div>Loading...</div>

  return (
    <>
      <div className="bg-slate-50-700 p-4 text-center">
        <h1 className="text-xl font-semibold text-black">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
        <Card className="p-6 border rounded-sm shadow-md">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold">₹{revenueDetails.reduce((acc, rev) => acc + rev.totalRevenue, 0)}</div>
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
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#F5A524" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  )
}

