import CourseProvider from "../../generalParts/trialCourse/ContextCourse"
import HorizontalNonLinearStepper from "../../generalParts/trialCourse/courseStepper"

 
export default function TrailAddCourse(){

    return (
        <>
        <CourseProvider>
        <HorizontalNonLinearStepper />
        </CourseProvider>
        </>

    )
}