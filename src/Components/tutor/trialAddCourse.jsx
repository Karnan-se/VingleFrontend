import CourseContext from "../../generalParts/trialCourse/ContextCourse"
import HorizontalNonLinearStepper from "../../generalParts/trialCourse/courseStepper"


export default function TrailAddCourse(){

    return (
        <>
        <CourseContext>
        <HorizontalNonLinearStepper />
        </CourseContext>
        </>

    )
}