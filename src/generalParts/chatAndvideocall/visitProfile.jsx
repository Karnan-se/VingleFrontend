import { useEffect, useState } from "react"
import { userApi } from "../../axios/axiosInstance"
import { totalCourse } from "../../features/api/visitProfile"
import { getInStructorDetails } from "../../features/api/visitProfile"
import {useNavigate} from "react-router-dom"

export default function VisitComponent({tutorId}){

    const [CourseCount, setTotalCourse] = useState();
    const [instructorDetails, setInstructorDetails] = useState()
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
                getInStructorDetails(tutorId._id),
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
    


    },[])

    

    const startChat = ()=>{
        navigate("/chatInterface", {state:{tutorId}})
    }

    

    return (
        <>
        {CourseCount &&  instructorDetails && (
        <div className="mx-10 flex w-1/2 mb-10 gap-5 items-center">
               <div className="bg-red-300 rounded-full w-28 h-28 " >
                <img src={tutorId.photo} alt="" />
               </div>

       
         <div className="items-center">
            <h2 className="text-xl font-semibold">Iam the Course Creator</h2>
         
            <div className="text-gray-600">{tutorId.firstName}</div>
            <div className="text-gray-600">{instructorDetails.headline}</div>
            <div className="flex items-center space-x-4 mt-2">
              <div className="text-blue-600"> {CourseCount.length} Courses</div>
              <div className="flex items-center">
                {/* <span className="text-gray-400">(76,335)</span> */}
              </div>
            </div>
          </div>
          <button className="h-12 items-center p-5 bg-yellow-300 rounded-lg ml-auto flex
            hover:bg-yellow-500 hover:text-white shadow-md " onClick={"visitProfile"}>
            Visit Profile
          </button>
          <button className="h-12 items-center p-5 bg-yellow-300 rounded-lg ml-auto flex 
           hover:bg-yellow-500 hover:text-white  shadow-md" onClick={startChat}>
            contact me
          </button>
          </div>
           )}
        </>
    )
}