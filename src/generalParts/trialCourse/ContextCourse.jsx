
import { createContext, useState, useContext, useEffect } from "react";
import PdfWrapper from "../../Components/context/pdfRenderContext";
import { useSelector } from "react-redux";
import { createformData } from "../../features/formData/createFormData";
import { createCourse } from "../../features/api/createCourse";
import { Spinner } from "@nextui-org/react";
import { useLoading } from "../preloader/LoadingContext";

// Create the context
const CourseContext = createContext();

export default function CourseProvider({ children }) {
  const tutorInfo = useSelector((state)=> state.tutor.tutorInfo)
  const {isLoading , setLoading} = useLoading()
  const [basicForm, setBasicForm] = useState();
  const [basicError, setBasicError] = useState({});
  const [section, setSection] = useState([]);
  const [secondError, setSecondError] = useState([]);

  const addSection = () => {
    const newSection = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      items: [],
    };
    setSection((prev) => [...prev, newSection]);
    // setSecondError((prevError)=> ([...prevError ,  { id: newSection.id, title: "Title required", items: [] },]))
  };

  useEffect(() => {
    console.log(secondError, "seconfError");
  }, [secondError]);

  const submitForm =()=>{
    try {
      setLoading(true)
      const Data = {...basicForm , sections: section}
     
     delete Data.tempObjective;
     Data.tutorId = tutorInfo._id
     console.log(Data  , "formData")
     const updatedData = {
      ...Data, 
      sections: (Data.sections || []).map(({ id, ...section }) => ({
        ...section,
        items: (section.items || []).map(({ id, ...item }) => item), 
      })),
    };
    
     const formData = createformData(updatedData);
     
     const addCourse = async()=>{
      try {
        const course= await createCourse(formData)
        console.log(course , "createCourse")

        
        
        
      } catch (error) {
        console.log(error)
        throw error
        
      }finally {
        setLoading(false)
      }
     }
     addCourse()
    
      
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }

  return (
    <CourseContext.Provider
      value={{
        basicForm,
        setBasicForm,
        basicError,
        setBasicError,
        section,
        setSection,
        addSection,
        secondError,
        setSecondError,
        submitForm
      }}
    >
      <PdfWrapper>{children}</PdfWrapper>
    </CourseContext.Provider>
  );
}

// Custom hook for using context
export const useCourseContext = () => useContext(CourseContext);
