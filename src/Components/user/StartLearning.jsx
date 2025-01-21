
import { useEffect } from "react";
import Navbar from "../../generalParts/landipage/Navbar"
import LearningComponent from "../../generalParts/startLearning/startlearning"
import { useLocation } from "react-router-dom"


export default function StartLearning(){

    const location = useLocation();
    const {course } = location.state || {}
    useEffect(()=>{
        function getCourseDetails(){
            


        }
        getCourseDetails();

    },[])
    return (
        <>
        <Navbar></Navbar>
        <LearningComponent  course={course}/>

        </>
    )
}