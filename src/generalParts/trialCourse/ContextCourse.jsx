import { title } from "process";
import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const CourseContext = createContext();

export  default function CourseProvider({ children }) {
    const [basicForm, setBasicForm] = useState();
    const [basicError, setBasicError] = useState({})
    const [section , setSection] = useState([])
   const [secondError , setSecondError] = useState([])

    const addSection = () => {
        const newSection = { 
          id: Math.random().toString(36).substr(2, 9),
          title: "",
          items: [],
        };
        setSection((prev) => [...prev, newSection]); 
        setSecondError((prevError)=> ([...prevError ,  { id: newSection.id, title: "Title required", items: [] },]))
      };
  

    return (
        <CourseContext.Provider value={{ basicForm, setBasicForm, basicError, setBasicError , section , setSection , addSection , secondError , setSecondError}}>
            {children}
        </CourseContext.Provider>
    );
}

// Custom hook for using context
export const useCourseContext = () => useContext(CourseContext);
