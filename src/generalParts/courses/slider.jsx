"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, Input } from "@nextui-org/react"
import { Search } from "lucide-react"
import ScrollLeftButton from "../landipage/ScrollLeft"
import ScrollRightButton from "../landipage/ScrollRight"
import { fetchAllCourse } from "../../features/api/fetchAllcourse"
import { lazy } from "react"
const ImageCard = lazy(()=> import("../landipage/Card"))
const CardFooter = lazy(()=> import("../landipage/Cardfooter"))
import { Suspense } from "react"



export default function Slider() {
  const scrollref = useRef(null)
  const [categories, setCategories] = useState()
  const [filteredCourses, setFilteredCourses] = useState(null)
  const [course, setCourse] = useState([])
  const [showAllCourses, setShowAllCourses] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  // Fetch the courseDetails
  useEffect(() => {
    const fetchData = async () => {
      const courses = await fetchAllCourse()
      const updatedCourses = await courses.filter((crs) => crs.isPublished === true)
      setCourse(updatedCourses)
    }
    fetchData()
  }, [])

  // Scroll 
  const scroll = (direction) => {
    if (scrollref.current) {
      const currentPos = scrollref.current.scrollLeft
      const newPos = direction === "right" ? currentPos + 300 : currentPos - 300
      scrollref.current.scrollTo({ left: newPos, behavior: "smooth" })
    }
  }

  // Navigate to course detail page
  const courseDetail = (courseDetail) => {
    navigate("/courseDetail", { state: { course: courseDetail } })
  }

  // search 
  useEffect(()=>{
    const handler = setTimeout(()=>{
        searchQuery.trim() ? setFilteredCourses(course.filter((courseItem)=>
             courseItem.name.toLowerCase().includes(searchQuery))) 
        : setFilteredCourses(null) 
    },300)
    return ()=> clearInterval(handler)

  },[searchQuery , course])


  const toggleView = useCallback(()=>{
    setShowAllCourses(!showAllCourses)
    setSearchQuery("");
    setFilteredCourses(null)

  })



  
  const displayCourses = filteredCourses || course

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{showAllCourses ? "All Courses" : "Featured Courses"}</h2>
          <Button variant="light" onClick={toggleView}>
            {showAllCourses ? "Show Featured" : "See all"}
          </Button>
        </div>

        {showAllCourses && (
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e)=> setSearchQuery(e.target.value)}
              startContent={<Search className="text-gray-400" size={20} />}
              className="max-w-md"
            />
          </div>
        )}

        {!showAllCourses ? (
          // Slider view
          <div className="relative">
            <div className="flex gap-4 pb-4 overflow-x-hidden" ref={scrollref}>
              {displayCourses.map((courseData, i) => (
                <Card key={i} className="min-w-[300px]">
                  <ImageCard ImageLink={courseData} navigate={courseDetail} />
                  <CardFooter courseData={courseData} />
                </Card>
              ))}
            </div>
            <ScrollLeftButton onClick={() => scroll("left")} />
            <ScrollRightButton onClick={() => scroll("right")} />
          </div>
        ) : (
          // Grid view for all courses
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayCourses.length > 0 ? (
              displayCourses.map((courseData, i) => (
                <Card key={i} className="h-full">
                    <Suspense fallback={<div className="bg-red-200">...Loading</div>}>
                    <ImageCard ImageLink={courseData} navigate={courseDetail} />
                    <CardFooter courseData={courseData} />

                    </Suspense>
                  
                  
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No courses found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {showAllCourses && displayCourses.length > 8 && (
          <div className="mt-8 text-center">
            <Button color="primary" variant="flat">
              Load More
            </Button>
          </div>
        )}
      </section>
    </>
  )
}

