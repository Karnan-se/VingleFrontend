'use client'

import React, { useState } from 'react'
import Navbar from '../landipage/Navbar'
import { lazy  } from 'react'
import VideoPlayer from '../viewCourse/VideoPlayer'


import {
    Star,
    PlayCircle, ChevronDown} from 'lucide-react'



const course = {
  name: "MERN Stack Development",
  sections: [
    {
      _id: 1,
      title: "Getting Started with MERN",
      items: [
        {
          _id: 101,
          title: "Introduction to MERN Stack",
          description: "Overview of MongoDB, Express, React, and Node.js",
          duration: 15
        },
        {
          _id: 102,
          title: "Setting Up Your Development Environment",
          description: "Installing necessary tools and configurations",
          duration: 20
        }
      ]
    },
    {
      _id: 2,
      title: "Backend Development",
      items: [
        {
          _id: 201,
          title: "Node.js Fundamentals",
          description: "Core concepts of Node.js and server-side JavaScript",
          duration: 25,
          fileUrl: "https://res.cloudinary.com/deubjmlf3/video/upload/v1735822852/Video_uploads/all-new-honda-elevate-you-re-the-chase-1080-publer.io.mp4-1735822842969._bpqcv3.mp4"
        },
        {
          _id: 202,
          title: "MongoDB Database Design",
          description: "Creating and managing MongoDB databases",
          duration: 30
        }
      ]
    },
    {
      _id: 3,
      title: "Frontend Development",
      items: [
        {
          _id: 301,
          title: "React Components and Props",
          description: "Building reusable React components",
          duration: 35
        },
        {
          _id: 302,
          title: "State Management with Redux",
          description: "Managing application state effectively",
          duration: 40
        }
      ]
    }
  ],
  tutor: {
    _id: "t123",
    name: "Robert James",
    role: "UI/UX Designer",
    courses: 56,
    rating: 4.9,
    reviews: 76235,
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-31pAZmxEGjPANbrsNdTUJrMSKGzbrT.png"
  }
}

export default function LearningComponent({course}) {

  console.log(course , "course")

  const [openSections, setOpenSections] = useState([]);
  const [fileUrl, setFileUrl] =useState();
  const toggleSection = (sectionId) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((_id) => _id !== sectionId)
        : [...prev, sectionId]
    );
  };
  return (
    <>
    
      <div className="min-h-screen bg-gray-50"> 
     <div className="bg-black text-white p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
            <p className="mb-4">{course.description}</p>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-400 text-black px-2 py-1 rounded">
                4.5
              </span>

              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="mt-2">Created by: {""}</p>
          </div>
        </div>
       
        <div className=' flex  p-10'> 
        <div className="mb-8 w-1/2 ">
              <h2 className="text-xl font-bold mb-4">Course Content</h2>
              <div className="border rounded-lg divide-y">
                {course.sections.map((section) => (
                  <div key={section._id} className="bg-white">
                    <button
                      onClick={() => toggleSection(section._id)  }
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                    >
                      <span className="font-medium">{section.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          openSections.includes(section._id)
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    {openSections.includes(section._id) && (
                      <div className="px-4 py-2 bg-gray-50">
                        {section.items.map((item) => (
                          <div
                            key={item._id}
                            className="py-2 flex items-start gap-3 "
                          >
                            <PlayCircle className="w-5 h-5 mt-1" />
                            <div>
                              <label htmlFor="" onClick={()=>setFileUrl(item.fileUrl)}>
                              <p className="font-medium cursor-pointer" >{item.title}</p>
                              <p className="text-sm text-gray-600 cursor-pointer">
                                {item.description}
                              </p>

                              </label>
                             
                              {item.duration && (
                                <span className="text-sm text-gray-500">
                                  {item.duration} min
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className='flex p-5 min-w-3xl'>
              {fileUrl  && ( <>
                <VideoPlayer fileUrl={fileUrl}></VideoPlayer>
              </>)}
           

            </div>
            



            </div>

            </div>
    </>
  )
}

