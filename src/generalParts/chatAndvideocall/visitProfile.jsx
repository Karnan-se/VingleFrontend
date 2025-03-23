import { useEffect, useState } from "react"
import { userApi } from "../../axios/axiosInstance"
import { totalCourse } from "../../features/api/visitProfile"
import { getInStructorDetails } from "../../features/api/visitProfile"
import {useNavigate} from "react-router-dom"
import { useSelector } from "react-redux"

export default function VisitComponent({tutorId , openRatingsModals}){

    const [CourseCount, setTotalCourse] = useState();
    const [instructorDetails, setInstructorDetails] = useState();
    const userInfo = useSelector((state)=> state.user.userInfo)
    const navigate = useNavigate()




    useEffect(()=>{
        
    async function getTotalCourse() {
        try {
            console.log(tutorId.id, "tutorID");
            console.log(tutorId._id, "tutorId");
    
          
            if (!tutorId || !tutorId._id) {
                throw new Error("Invalid tutorId provided");
            }
    
            const [totalCourseResult, instructorDetailsResult] = await Promise.all([
                totalCourse(tutorId._id),
                getInStructorDetails(userInfo._id),
            ]);
    
    
            return { totalCourseResult, instructorDetailsResult };
        } catch (error) {
            console.error("Error in getTotalCourse:", error.message);
            throw error; 
        }
    }
    
  
    getTotalCourse()
        .then((result) => {
            setTotalCourse(result.totalCourseResult)
            console.log(result.totalCourseResult , "totalCourse")
            setInstructorDetails(result.instructorDetailsResult)
            console.log(result.instructorDetailsResult, "instructor result ")

        })
        .catch((error) => console.error("Error in API calls:", error.message));
    


    },[userInfo])

    

    const startChat = ()=>{
        navigate("/chatInterface", {state:{tutorId}})
    }


    const RateMyCourse = () =>{
        console.log("rateMyCourse")
    }

    

    return (
        <>
       
  {CourseCount && instructorDetails && (
    <div className="flex flex-col md:flex-row w-[95%] mx-4 sm:mx-6 md:mx-10 mb-10 gap-4 sm:gap-5 items-center">
      {/* Image Section */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0">
        <img
          src={tutorId.photo}
          alt={`${tutorId.firstName}'s profile`}
          className="rounded-full w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center text-center md:text-left">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          I am the Course Creator
        </h2>
        <div className="text-gray-600 text-sm sm:text-base">
          {tutorId.firstName}
        </div>
        <div className="text-gray-600 text-sm sm:text-base">
          {instructorDetails.headline}
        </div>
        <div className="flex flex-col sm:flex-row items-center md:items-start space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
          <div className="text-blue-600 text-sm sm:text-base">
            {CourseCount.length} Courses
          </div>
          <div className="flex items-center">{/* Add content here if needed */}</div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 md:ml-auto w-full sm:w-auto">
        <button
          className="w-full sm:w-auto h-12 px-4 sm:px-5 bg-yellow-300 rounded-lg flex items-center justify-center text-sm sm:text-base hover:bg-yellow-500 hover:text-white shadow-md transition-colors"
          onClick={() => "visitProfile"} // Assuming this is a placeholder; replace with actual function
        >
          Visit Profile
        </button>
        <button
          className="w-full sm:w-auto h-12 px-4 sm:px-5 bg-yellow-300 rounded-lg flex items-center justify-center text-sm sm:text-base hover:bg-yellow-500 hover:text-white shadow-md transition-colors"
          onClick={startChat}
        >
          Contact Me
        </button>
        <button
          className="w-full sm:w-auto h-12 px-4 sm:px-5 bg-yellow-300 rounded-lg flex items-center justify-center text-sm sm:text-base hover:bg-yellow-500 hover:text-white shadow-md transition-colors"
          onClick={openRatingsModals}
        >
          Rate My Course
        </button>
      </div>
    </div>
  )}
</>
    )
}