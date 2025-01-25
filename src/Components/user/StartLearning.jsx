
import { useEffect } from "react";
import Navbar from "../../generalParts/landipage/Navbar"
import LearningComponent from "../../generalParts/startLearning/startlearning"
import { useLocation } from "react-router-dom"
import VisitComponent from "../../generalParts/chatAndvideocall/visitProfile";


export default function StartLearning(){

    const location = useLocation();
    const {course } = location.state || {}
    // useEffect(()=>{
    //     async function getCourseDetails(){
    //         const isProgressTracked =  await isProgressTracked()

    //     }
    //     getCourseDetails();

    // },[])
    return (
        <>
        <Navbar></Navbar>
        <LearningComponent  course={course}/>
        <VisitComponent tutorId={course.tutorId}/>
       

        </>
    )
}