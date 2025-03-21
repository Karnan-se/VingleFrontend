import Navbar from "../../generalParts/landipage/Navbar";
import LearningComponent from "../../generalParts/startLearning/startlearning";
import { useLocation } from "react-router-dom";
import VisitComponent from "../../generalParts/chatAndvideocall/visitProfile";
import { useEffect, useState } from "react";
import RatingsModal from "../../generalParts/startLearning/ratingsModal";
import { useSelector } from "react-redux";
import PdfWrapper from "../context/pdfRenderContext";
import { getCourse } from "../../features/api/fetchAllcourse";

export default function StartLearning() {
  const location = useLocation();
  const { course } = location.state || {};
  const [ratingModal, setRatingsModal] = useState(false);
  const [courseDetails, setCourseDetails] = useState();
  const [rating, setRating] = useState(0);
  const userInfo = useSelector((state) => state.user.userInfo);

  const openRatingsModals = () => {
    setRatingsModal((prev) => (prev = !prev));
  };

//   useEffect(() => {
//     setCourseDetails((prev) => (prev !== course ? course : prev));
//   }, [course]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
      
        
          const course1 = await getCourse(course._id);
          

          setCourseDetails(course1);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourse();
  }, [rating ,course ,setRating]);



  return (
    <>
      {course && (
        <>
          <Navbar></Navbar>
          <PdfWrapper>
            <LearningComponent course={course} />
          </PdfWrapper>
          <VisitComponent
            tutorId={course.tutorId}
            openRatingsModals={openRatingsModals}
          />
          {ratingModal && userInfo && (
            <RatingsModal
              course={course}
              openRatingsModals={openRatingsModals}
              userInfo={userInfo}
              rating={rating}
              setRating={(index) => setRating(index)}
            />
          )}
        </>
      )}
    </>
  );
}
