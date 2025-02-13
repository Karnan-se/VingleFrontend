
import Navbar from "../../generalParts/landipage/Navbar"
import LearningComponent from "../../generalParts/startLearning/startlearning"
import { useLocation } from "react-router-dom"
import VisitComponent from "../../generalParts/chatAndvideocall/visitProfile";
import { useState } from "react";
import RatingsModal from "../../generalParts/startLearning/ratingsModal";
import { useSelector } from "react-redux";


export default function StartLearning(){

    const location = useLocation();
    const {course } = location.state || {}
    const [ratingModal , setRatingsModal] = useState(false)
    const userInfo = useSelector((state)=> state.user.userInfo)
    

    const openRatingsModals = () =>{
        setRatingsModal((prev)=>  prev = ! prev)
    }
   



    return (
        <>
        <Navbar></Navbar>
        <LearningComponent  course={course}/>
        <VisitComponent tutorId={course.tutorId} openRatingsModals={openRatingsModals}/>
        {ratingModal &&  userInfo && (
            <RatingsModal  course={course} openRatingsModals={openRatingsModals} userInfo={userInfo}/>
        )}
       

        </>
    )
}