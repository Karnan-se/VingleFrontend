import { Avatar } from "@nextui-org/react";
import { StarIcon } from "lucide-react";
import { useState , useEffect } from "react";
import { totalCourse } from "../../features/api/visitProfile";
import { getInStructorDetails } from "../../features/api/visitProfile";

export default function ImgMediaCard({tutorId }) {

   const [CourseCount, setTotalCourse] = useState([]);
   const [instructorDetails, setInstructorDetails] = useState()

   if(!tutorId){
    return null
   }
   

  useEffect(() => {
    async function getTotalCourse() {
      try {
       
        console.log(tutorId._id, "tutorId");

        if (!tutorId || !tutorId._id) {
          throw new Error("Invalid tutorId provided");
        }

        const [totalCourseResult, instructorDetailsResult] = await Promise.all([
          totalCourse(tutorId._id),
          getInStructorDetails(tutorId._id),
        ]);
        console.log(totalCourseResult.length , "wjefnkjenfjwfenkjenfji")

        return { totalCourseResult, instructorDetailsResult };
      } catch (error) {
        console.error("Error in getTotalCourse:", error.message);
        throw error;
      }
    }

    
    getTotalCourse()
      .then((result) => {
        setTotalCourse(result.totalCourseResult);
        
        console.log(result.totalCourseResult, "totalCourse");
        setInstructorDetails(result.instructorDetailsResult.applicationDetails);
        
      })
      .catch((error) => console.error("Error in API calls:", error.message));
  }, []);


  if(!instructorDetails){
    return null
  }

  return (
    <div className="flex flex-wrap justify-center items-center mx-auto">
      <div key={``} className="flex flex-col items-center justify-center">
        <Avatar
          src="/placeholder.svg?height=120&width=120"
          className="w-24 h-24 mb-2 bg-red-200"
        />
        <h4 className="text-gray-500 font-medium">{tutorId.firstName}</h4>
        {instructorDetails && ( 
        <p className="text-sm font-medium">{instructorDetails.headline}</p>  )}

        <p className="text-sm text-teal-600">{CourseCount.length}</p>
        <div className="flex items-center gap-1"></div>
      </div>
    </div>
  );
}
