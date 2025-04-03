
import { createContext, useState, useContext, useEffect } from "react";
import PdfWrapper from "../../Components/context/pdfRenderContext";
import { useSelector } from "react-redux";
import { createformData } from "../../features/formData/createFormData";
import { createCourse } from "../../features/api/createCourse";
import { Spinner } from "@nextui-org/react";
import { useLoading } from "../preloader/LoadingContext";
import { EfficientAddCourse } from "../../Components/tutor/secondAddCourse";
import { tutorApi } from "../../axios/axiosInstance";
import { uploadtoCloudinarySignedURL } from "../../features/api/uploadCloudinary";
import { uploadtoCloudinary } from "../../features/api/uploadCloudinary";

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

  const submitForm = async ()=>{
    try {
      // setLoading(true)
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


      const secureUrls = await Promise.all(
        updatedData.sections.flatMap((section) =>
          section.items.map(async (item) => {
            if (!item.fileUrl) return null; 
        
            const fileType = item.fileUrl.type == "video/mp4" ? "mp4" : "application/pdf";
        
            const response = await tutorApi.post("/get-signedUrl", { fileType });
        
            if (!response.data.signedUrl) {
              throw new Error("Failed to get signed URL");
            }
        
            const signedUrl = response.data.signedUrl;
            console.log(signedUrl , "signed Url")
            const secure_url = await uploadtoCloudinarySignedURL(item.fileUrl, signedUrl);
            console.log(secure_url , "secureUlr")
        
            return secure_url;
          })
        )
      );

    const thumbnailUrl = await uploadtoCloudinary(updatedData.thumbnail)
    updatedData.thumbnail = thumbnailUrl

  updatedData.sections.forEach((section) => {
      section.items.forEach((item, index) => {
          item.fileUrl = secureUrls[index]; 
      });
  });
  
  console.log(updatedData, "secure URLs Got");
  
    
    //  const formData =   createformData(updatedData);
    
     
     const addCourse = async()=>{
      try {
        const course= await createCourse(updatedData)
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
