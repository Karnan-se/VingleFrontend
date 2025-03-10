import ImgMediaCard from "./tutorsCard";
import { fetchStudents } from "../../features/api/getAllStudents";
import { useEffect, useState } from "react";
import { lazy } from "react";
import { motion } from "framer-motion";
import { fetchTutorByEmail } from "../../features/api/getAllStudents";
import { Suspense } from "react";
const ImageCard = lazy(() => import("../landipage/Card"));
const CardFooter = lazy(() => import("../landipage/Cardfooter"));
import { Card } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function TutorsCard() {
  const [tutors, setTutors] = useState();
  const [isExpanded, setExpanded] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

 

  useEffect(() => {
    const fetchStudent = async () => {
      const allUsers = await fetchStudents();
      const tutors = allUsers
        .filter((tutor) => tutor.isInstructor == "Accepted")
        .map((tutor) => tutor.emailAddress);
      console.log(tutors, "emailAddress of users");
      if (tutors) {
        const validTutors = await fetchTutorByEmail(tutors);
        console.log(validTutors, "VALIDtuTORS");
        const userDetails = allUsers.filter((user) =>
          validTutors.some((tutor) => tutor.emailAddress === user.emailAddress)
        );
        console.log(userDetails, "userDetails");
        const correctedTutorDetails = validTutors.map((tutor) => {
          const matchedUser = userDetails.find(
            (user) => user.emailAddress == tutor.emailAddress
          );
          return {
            ...tutor,
            userId: matchedUser ? matchedUser._id : null,
          };
        });
        setTutors(correctedTutorDetails);
      }
    };
    fetchStudent();
  }, []);

  if (!tutors) {
    return null;
  }

  const itemsPerPage = 9;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let paginatedCourse
if(selectedCourse){  
   paginatedCourse = selectedCourse.slice(startIndex, endIndex);
}

  const openFlyingDiv = (tutorId, CourseCount) => {
    console.log(tutorId, CourseCount);
    setSelectedTutor(tutorId);
    setSelectedCourse(CourseCount);

    setExpanded(true);
  };
  const courseDetail = (courseDetail) => {
    navigate("/courseDetail", { state: { course: courseDetail } });
  };

  return (
    <>
      <div className="overflow-auto" >
        <motion.div
          className="flex flex-col items-center w-full justify-center bg-red-100 "
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="flex justify-center text-lg font-semibold">
            Meet our Popular Tutors
          </p>
        </motion.div>

        <div className="flex flex-row  flex-wrap  border  items-center justify-between w-full p-5 flex-grow-0 relative  ">
          {tutors &&
            tutors.map((tutorId, index) => (
              <motion.div
                key={index}
                className="flex flex-row items-center justify-center"
                initial={{ opacity: 0, y: 90 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: index * 0.1,
                  duration: 0.9,
                }}
              >
                {tutorId && (
                  <ImgMediaCard
                    tutorId={tutorId}
                    setExpanded={setExpanded}
                    isExpanded={isExpanded}
                    openFlyingDiv={openFlyingDiv}
                  />
                )}
              </motion.div>
            ))}
        </div>
        {isExpanded && (
          <>
            <motion.div
              className="w-full h-auto bg-red-100  absolute left-0  items-center justify-center"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 2,
              }}
            >
              <div className="p-5 flex items-center justify-center ">
                <ImgMediaCard tutorId={selectedTutor} />
              </div>

              <div className="">
                {selectedCourse.length > 0 ? (
                  <>
                   <div className="flex justify-start items-center flex-wrap gap-36">  
                    {paginatedCourse.map((courseData, i) => (
                      <Card key={i} className="h-full w-56">
                        <Suspense
                          fallback={
                            <div className="bg-red-200">...Loading</div>
                          }
                        >
                          <ImageCard
                            ImageLink={courseData}
                            navigate={courseDetail}
                          />
                          <CardFooter courseData={courseData} />
                        </Suspense>
                      </Card>
                    ))}
                     </div>


                     <div className="p-10 w-full flex justify-end" > 
                    
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1), 1)
                        }
                        disabled={currentPage == 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                      >
                        Previous
                      </button>
                    
                    <button
                      onClick={() =>
                        setCurrentPage(
                          (prev) => Math.min(prev + 1),
                          Math.ceil(selectedCourse.length / itemsPerPage)
                        )
                      }
                      disabled={
                        currentPage >
                        Math.ceil(selectedCourse.length / itemsPerPage)
                      }
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >Next</button>

                               </div>
                  </>
                ) : (
                  <>
                  <div className="flex justify-center">
                    <p> No Course Found</p>

                  </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
}
