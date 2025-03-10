import { Avatar } from "@nextui-org/react";

import { useState, useEffect } from "react";
import { totalCourse } from "../../features/api/visitProfile";
import { getInStructorDetails } from "../../features/api/visitProfile";
import { motion } from "framer-motion";




export default function ImgMediaCard({ tutorId, setExpanded, isExpanded  , openFlyingDiv}) {
  const [CourseCount, setTotalCourse] = useState();
  const [instructorDetails, setInstructorDetails] = useState();

  if (!tutorId) {
    return null;
  }

  useEffect(() => {
    async function getTotalCourse() {
      try {
        console.log(tutorId, "tutorId");

        console.log(tutorId._id, "tutorId");

        if (!tutorId || !tutorId._id) {
          throw new Error("Invalid tutorId provided");
        }

        const [totalCourseResult, instructorDetailsResult] = await Promise.all([
          totalCourse(tutorId._id),
          getInStructorDetails(tutorId.userId),
        ]);
        console.log(totalCourseResult.length, "wjefnkjenfjwfenkjenfji");

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

  if (!instructorDetails || !CourseCount) {
    return null;
  }

  return (
    <motion.div
      className="flex flex-wrap justify-center items-center mx-auto cursor-pointer"
      onClick={() => openFlyingDiv(tutorId , CourseCount)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        key={``}
        className="flex flex-col items-center justify-center"
        whileTap={isExpanded ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        <Avatar src={tutorId.photo} className="w-24 h-24 mb-2 bg-red-200" />
        <h4 className="text-gray-500 font-medium">{tutorId.firstName}</h4>
        {instructorDetails && (
          <p className="text-sm font-medium">
            {instructorDetails?.headline || 0}
          </p>
        )}

        <p className="text-sm text-teal-600">{CourseCount?.length || 0}</p>
        <div className="flex items-center gap-1"></div>
      </motion.div>
    </motion.div>
  );
}
