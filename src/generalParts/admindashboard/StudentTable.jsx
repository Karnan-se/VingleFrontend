"use client"

import { useState } from "react"
import { useEffect } from "react"
import { userApi } from "../../axios/axiosInstance"
import { useSocket } from "../../Components/context/socketContext"
import { adminPaginatedStudent } from "../../features/api/paginatiion/order"

export default function StudentTable() {
  const { socket } = useSocket()
  

  const [students, setStudents] = useState([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [totalStudents, setTotalStudents] = useState(0)

  useEffect(() => {
    const fetchcoursePurchased = async () => {
      try {
        const filterChange = statusFilter != "all" ? statusFilter : null
        const { students, totalStudents } = await adminPaginatedStudent(currentPage, search, filterChange )
        console.log(students, "student with purchased Course")
        setStudents(students)
        setTotalStudents(totalStudents)
      } catch (error) {
        console.log(error)
      }
    }

    fetchcoursePurchased()
  }, [currentPage, search, statusFilter])

  useEffect(() => {
    console.log(students, "students")
  }, [students])

  const totalPages = Math.ceil(totalStudents / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage

  const toggleStatus = (studentId) => {
    console.log("Before setStudents:", students)
    const updatedStudents = students.map((student) => {
      if (student._id === studentId) {
        return { ...student, isBlocked: !student.isBlocked }
      }
      return student
    })

    setStudents(updatedStudents)

    const updatedStudent = updatedStudents.find((student) => student._id === studentId)
    console.log("Updated Student:", updatedStudent)

    updateUser(updatedStudent)
  }

  const updateUser = async (user) => {
    try {
      const response = await userApi.post("/block", { user })

      console.log("Update Response:", response)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  return (
    <div className="min-h-full bg-gray-50 p-8 mx-auto w-full ">
      <div className="mb-6 flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All </option>
          <option value="false">Active</option>
          <option value="true">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          {students ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sl. No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses Purchased
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    isBlocked
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student, index) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              student.photo ||
                              "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
                            }
                            alt=""
                            width={40}
                            height={40}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.firstName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {student.purchasedCourse &&
                          student.purchasedCourse.map((purchasedCourse, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {purchasedCourse}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          !student.isBlocked ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.isBlocked ? "inactive" : "active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => toggleStatus(student._id)}
                        className={`mr-2 px-3 py-1 rounded ${
                          student.isBlocked === false
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                      >
                        {student.isBlocked == false ? "Block" : "Unblock"}
                      </button>
                      <button className="px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No User details"
          )}
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">{Math.min(startIndex + itemsPerPage, totalStudents)}</span> of{" "}
                <span className="font-medium">{totalStudents}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
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
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
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

