import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";





const CourseProvider = createContext()

export default function CourseContext ({children}){
    const [basicForm , setBasicForm] = useState()



    return(
        <CourseProvider.Provider value={{basicForm , setBasicForm}}>
            {children}
        </CourseProvider.Provider>

    )

    
}

export const usecourseContext =()=>useContext(CourseProvider)
