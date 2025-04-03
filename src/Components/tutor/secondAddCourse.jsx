import CourseProvider from "../../generalParts/TrialCourseSIgned/ContextCourse";
import HorizontalNonLinearStepper from "../../generalParts/TrialCourseSIgned/courseStepper";



export const EfficientAddCourse = ()=>{
    return (
        <CourseProvider>
            <HorizontalNonLinearStepper />
            </CourseProvider>
    )
}