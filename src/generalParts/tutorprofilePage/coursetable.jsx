"use client"

import { useEffect, useState } from "react"
import { PlusCircle } from "lucide-react"
import { tutorApi } from "../../axios/axiosInstance"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { adminPaginatedCourse } from "../../features/api/paginatiion/order"

export default function CourseTable() {
  const tutorInfo = useSelector((state) => state.tutor.tutorInfo)
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCourses, setTotalCourses] = useState(0)
  const navigate = useNavigate()
  const itemsPerPage = 5

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Only pass statusFilter if it's not "all"
        const filterToSend = statusFilter === "all" ? null : statusFilter

        // Pass tutorId to filter courses by tutor
        const { course, totalCourse } = await adminPaginatedCourse(currentPage, search, filterToSend, tutorInfo._id)

        console.log(course, "Fetched courses")
        setCourses(course)
        setTotalCourses(totalCourse)
      } catch (error) {
        console.log(error)
      }
    }

    // Only fetch if tutorInfo is available
    if (tutorInfo && tutorInfo._id) {
      fetchCourses()
    }

 
  }, [tutorInfo, currentPage, search, statusFilter])


useEffect(()=>{
  setCurrentPage(1)
},[search])





  const totalPages = Math.ceil(totalCourses / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage

  const toggleStatus = async (courseId) => {
    try {
      // Update UI optimistically
      const updatedCourses = courses.map((course) =>
        course._id === courseId ? { ...course, isPublished: !course.isPublished } : course,
      )

      setCourses(updatedCourses)

      // Update in the backend
      const courseToUpdate = updatedCourses.find((course) => course._id === courseId)
      if (courseToUpdate) {
        await tutorApi.post("/updateCourse", {
          courseId,
          isPublished: courseToUpdate.isPublished,
        })
      }
    } catch (error) {
      console.error("Error toggling course status:", error)
      // Revert UI change if API call fails
      // Refetch courses to ensure UI is in sync with backend
      const filterToSend = statusFilter === "all" ? null : statusFilter
      const { course } = await adminPaginatedCourse(currentPage, search, filterToSend, tutorInfo._id)
      setCourses(course)
    }
  }

  const handleEdit = (course) => {
    console.log(course)
    navigate("/tutor/editCourse", { state: { course } })
  }

  const handleDelete = async (courseId) => {
    try {
      // Optimistic UI update
      setCourses(courses.filter((course) => course._id !== courseId))

      // Delete from backend
      await tutorApi.delete(`/deleteCourse/${courseId}`)
    } catch (error) {
      console.error("Error deleting course:", error)
      // Revert UI change if API call fails
      const filterToSend = statusFilter === "all" ? null : statusFilter
      const { course } = await adminPaginatedCourse(currentPage, search, filterToSend, tutorInfo._id)
      setCourses(course)
    }
  }

  const handleAddNewCourse = () => {
    navigate("/tutor/coursecreate")
  }

  return (
    <div className="min-h-full bg-gray-50 p-8 mx-auto w-full">
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name..."
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
          <option value="all">All</option>
          <option value="true">Published</option>
          <option value="false">Unpublished</option>
        </select>
        <button
          onClick={handleAddNewCourse}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New Course
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sl. No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course, index) => (
                <tr key={course._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{startIndex + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={course.thumbnail || "/placeholder.svg"}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{course.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(course.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(course._id)}
                      className={`px-3 py-1 rounded ${
                        course.isPublished
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {course.isPublished ? "Published" : "Unpublished"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(course)}
                      className="mr-2 px-3 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">{Math.min(startIndex + itemsPerPage, totalCourses)}</span> of{" "}
                <span className="font-medium">{totalCourses}</span> results
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
                  disabled={currentPage === totalPages || totalPages === 0}
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

