
import Navbar from "../../generalParts/landipage/Navbar"
import LearningComponent from "../../generalParts/startLearning/startlearning"
import { useLocation } from "react-router-dom"
import VisitComponent from "../../generalParts/chatAndvideocall/visitProfile";
import { useEffect, useState } from "react";
import RatingsModal from "../../generalParts/startLearning/ratingsModal";
import { useSelector } from "react-redux";
import PdfWrapper from "../context/pdfRenderContext";
import { usepdfContext } from "../context/pdfRenderContext";

export default function StartLearning(){

    const location = useLocation();
    const {course } = location.state || {}
    const [ratingModal , setRatingsModal] = useState(false)
    const userInfo = useSelector((state)=> state.user.userInfo)

    useEffect(()=>{
        console.log(course , "course in startLEarning")

    },[course])
 
 
    const openRatingsModals = () =>{
        setRatingsModal((prev)=>  prev = ! prev)
    }
   



    return (
        <>
        <Navbar></Navbar>
        <PdfWrapper>  
        <LearningComponent  course={course}/>
        </PdfWrapper>
        <VisitComponent tutorId={course.tutorId} openRatingsModals={openRatingsModals}/>
        {ratingModal &&  userInfo && (
            <RatingsModal  course={course} openRatingsModals={openRatingsModals} userInfo={userInfo}/>
        )}
        </>
    )
}