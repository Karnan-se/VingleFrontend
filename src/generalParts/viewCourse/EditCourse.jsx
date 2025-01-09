import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import CourseSection from "./viewsection";
import { useState } from "react";


export default function EditCourse(){

    const location = useLocation();
    const [section, setSection] = useState([])
    const {course} = location.state || {}
    useEffect(()=>{
        console.log(course)
        const sections = course.sections;
        console.log(sections)
        setSection(sections)

    },[])

   

    


    
    return (
        <>
        {section.length >0 && (  
        <CourseSection sectionData={section} setSection={setSection}/>
    )}

        </>
    )
}