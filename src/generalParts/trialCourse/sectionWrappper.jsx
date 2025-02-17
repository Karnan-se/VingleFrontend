import { useCourseContext } from "./ContextCourse"
import { Section } from "./section"


export default function SectionWrapper(){
    const { secondError , setSecondError , section , setSection , addSection}  = useCourseContext()
        
    const updateSectionTitle =(e ,sectionId) =>{
        const newTitle = e.target.value;
        setSection((prevSection)=>
        prevSection.map((sect)=> sect.id == sectionId ? {...sect , title: e.target.value} : sect))
        setSecondError((prevErrors) =>
            prevErrors.map((err) =>
              err.id === sectionId ? { ...err, title: newTitle ? "" : "Title required" } : err
            )
          );
          
    }

    const deleteSection =(e, sectionId)=>{
        console.log(sectionId)
        setSection((prev)=>(prev.filter((sect)=> sect.id != sectionId)))
        setSecondError((prev)=> prev.filter((err)=>err.id != sectionId))
    }
    

    return (

        <>
        <button  onClick={()=>addSection()}>Add Content</button>
        {section.map((sect , index)=> (  

            <div key={index} className="w-full">
            <Section section={sect} 
            setSection={setSection} 
            updateSectionTitle={updateSectionTitle}
            deleteSection={deleteSection}
            error={secondError.find((err)=>err.id == sect.id
            )
                
            }/>
            </div>
        ))}
        
        </>
    )
}