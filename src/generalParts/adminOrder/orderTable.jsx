"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { adminOrder } from "../../features/api/paginatiion/order"

export default function OrderDetails() {
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalOrders, setTotalOrders] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const itemsPerPage = 10

  
  const totalPages = Math.ceil(totalOrders / itemsPerPage)

  
  const fetchOrders = async (page = 1, search = "" , statusFilter) => {
    setLoading(true)
    setError(null)
    try {
      const response = await adminOrder(page)
  
      setOrders(response.orders)
      setTotalOrders(response.totalOrders)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setError("Failed to load orders. Please try again.")
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchOrders(currentPage)
  }, [])

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
    console.log(page , "number number pagenUmber")
    fetchOrders(page)
  }

  // Handle search and filter changes
  const handleSearchOrFilterChange = () => {
    // Reset to page 1 when search or filter changes
    setCurrentPage(1)
    fetchOrders(1 , search , statusFilter)
    // Note: You'll need to modify your API to accept search and filter parameters
  }

  if (loading && !orders.length) {
    return <div className="min-h-full bg-gray-50 p-8 flex justify-center items-center">Loading...</div>
  }

  if (error && !orders.length) {
    return <div className="min-h-full bg-gray-50 p-8 flex justify-center items-center text-red-500">{error}</div>
  }

  return (
    <div className="min-h-full bg-gray-50 p-8 mx-auto w-full">
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by username or tutor..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            
              handleSearchOrFilterChange()
            }}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            handleSearchOrFilterChange()
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="Completed">Paid</option>
          <option value="Pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading && orders.length > 0 && <div className="p-4 text-center text-gray-500">Updating results...</div>}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.userId?.firstName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.courseId?.tutorId?.firstName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        order.paymentStatus === "Completed"
                          ? "bg-green-100 text-green-800"
                          : order.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.totalAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalOrders)}</span> of{" "}
                <span className="font-medium">{totalOrders}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {/* Show all page numbers */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    disabled={loading}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === i + 1
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

