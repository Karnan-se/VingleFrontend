import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import CourseSection from "./viewsection";
import { useState } from "react";
import { getCourse } from "./getCourse";
import PdfWrapper from "../../Components/context/pdfRenderContext";


export default function EditCourse(){

    const location = useLocation();
    const [section, setSection] = useState([])
    const {course} = location.state || {}

    useEffect(() => {
        if (course && course._id) {
            
         
      
          getCourse(course._id)
            .then((fetchedCourse) => {
              console.log(fetchedCourse, "Fetched course data");
              setSection(fetchedCourse.sections)
            
            })
            .catch((error) => {
              console.error("Error in fetching course:", error);
            });
        }
      }, [course]);


  

 
    return (
        <>
        <PdfWrapper>  
        {section.length >0 && (  
        <CourseSection sectionData={section} setSection={setSection} course_id={course._id}/>
    )}
 </PdfWrapper>
        </>
    )
}