'use client'

import { Card, CardBody, CardFooter, Progress, Tabs, Tab } from "@nextui-org/react"
// import Image from "next/image"

export default function CourseMain() {
  const courses = [
    {
      id: 1,
      title: "The Complete AI-powered Copywriting Course & ChatGPT",
      author: "By: Tomas Moravek,team Digital",
      progress: 75,
      image: "/placeholder.svg?height=200&width=300",
      status: "in-progress" 
    },
    {
      id: 2,
      title: "The Complete AI-powered Copywriting Course & ChatGPT",
      author: "By: Tomas Moravek,team Digital",
      progress: 45,
      image: "/placeholder.svg?height=200&width=300",
      status: "wishlist"
    },
    {
      id: 3,
      title: "The Complete AI-powered Copywriting Course & ChatGPT",
      author: "By: Tomas Moravek,team Digital",
      progress: 100,
      image: "/placeholder.svg?height=200&width=300",
      status: "completed"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 gap-11">
     
      <div className="text-center mb-8 ">
        <h1 className="text-3xl font-bold mb-2">My Learnings</h1>
        <h2 className="text-xl text-gray-600">Enrolled Courses</h2>
      </div>

      
      <Tabs 
        aria-label="Course tabs" 
        className="mb-8"
        classNames={{
          tabList: "gap-4 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-yellow-400",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-yellow-400"
        }}
      >
        <Tab
          key="courses"
          title={
            <div className="flex items-center space-x-2">
              <span>Courses</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {courses.filter(course => course.status === "in-progress").map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Tab>
        
        <Tab
          key="wishlist"
          title={
            <div className="flex items-center space-x-2">
              <span>My WishList</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {courses.filter(course => course.status === "wishlist").map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Tab>

        <Tab
          key="completed"
          title={
            <div className="flex items-center space-x-2">
              <span>Completed Courses</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {courses.filter(course => course.status === "completed").map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

function CourseCard({ course }) {
  return (
    <Card className="w-full">
      <CardBody className="p-0">
        <img
          src={course.image}
          alt={course.title}
          width={300}
          height={200}
          className="w-full object-cover"
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="font-medium text-sm mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-500 text-sm mb-3">{course.author}</p>
        <Progress 
          value={course.progress} 
          className="w-full" 
          classNames={{
            indicator: "bg-yellow-400",
            track: "bg-gray-200"
          }}
        />
      </CardFooter>
    </Card>
  )
}

