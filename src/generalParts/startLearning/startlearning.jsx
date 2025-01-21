import React, { useEffect, useState } from 'react'
import VideoPlayer from '../viewCourse/VideoPlayer'
import { isProgressTracked } from '../../features/api/isProgreesTracked'
import { createProgress } from '../../features/api/isProgreesTracked'
import { useSelector } from 'react-redux'

import {Star,PlayCircle, ChevronDown} from 'lucide-react'


export default function LearningComponent({course}) {

  const userInfo = useSelector((state)=> state.user.userInfo)
  const [progress, setProgress] = useState()



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

  useEffect(() => {
    async function getProgress() {
      try {
        const progress = await isProgressTracked(userInfo._id, course._id);
        if (progress?.message === "not tracked") {
          const create = await createProgress(userInfo._id, course._id);
          console.log(create, "create");
          return create?.Progress; 
        }

        return progress?.Progress;
      } catch (error) {
        console.error("Error fetching or creating progress:", error);
        return null; 
      }
    }
 
    getProgress().then((result) => {
      if (result) {
        setProgress(result); 
      }
    });
  }, [userInfo._id, course._id]);

  console.log(progress, "progreress")

  const updatePercentage = (percentage)=>{

  }
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
                <VideoPlayer fileUrl={fileUrl} updatePercentage ={(percentage)=>updatePercentage(percentage)} />
              </>)}
           

            </div>
            



            </div>

            </div>
    </>
  )
}

