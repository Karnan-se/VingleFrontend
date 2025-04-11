import Navbar from "../../generalParts/landipage/Navbar";
import LearningComponent from "../../generalParts/startLearning/startlearning";
import { useLocation } from "react-router-dom";
import VisitComponent from "../../generalParts/chatAndvideocall/visitProfile";
import { useEffect, useState } from "react";
import RatingsModal from "../../generalParts/startLearning/ratingsModal";
import { useSelector } from "react-redux";
import PdfWrapper from "../context/pdfRenderContext";
import { getCourse } from "../../features/api/fetchAllcourse";
import { useNavigate } from "react-router-dom";


export default function StartLearning() {
  const navigate = useNavigate()
  const location = useLocation();
  const { course } = location.state || {};
  const [ratingModal, setRatingsModal] = useState(false);
  const [courseDetails, setCourseDetails] = useState();
  const [rating, setRating] = useState(0);
  const userInfo = useSelector((state) => state.user.userInfo);

  const openRatingsModals = () => {
    setRatingsModal((prev) => (prev = !prev));
  };

  useEffect(() => {
    if (!course) {
      console.warn("No course data found.");
      navigate("/");
    }

  }, [course, navigate]);

      useEffect(()=>{
        console.log(rating ,  "rating changed ")

      },[rating])

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
  }, [rating ,course ,setRating , ratingModal]);



  return (
    <>
      {courseDetails && (
        <>
          <Navbar></Navbar>
          <PdfWrapper>
            <LearningComponent course={courseDetails} />
          </PdfWrapper>
          <VisitComponent
            tutorId={courseDetails.tutorId}
            openRatingsModals={openRatingsModals}
          />
          {ratingModal && userInfo && (
            <RatingsModal
              course={courseDetails}
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
