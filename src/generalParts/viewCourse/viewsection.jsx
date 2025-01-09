import { ChevronDown, ChevronUp, Play, FileText } from "lucide-react";
import { Section } from "./editableSection";
import { X } from 'lucide-react';

import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";

export default function CourseSection({ sectionData , setSection }) {
  console.log(sectionData, "sectionData");

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("edit");
    setExpanded(true)
  };

  const [expandedSections, setExpandedSections] = useState([]);
  const [item, setItem] = useState();
  const [isExpanded , setExpanded] = useState(false)
  

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const updateSection = (sectionId, updatedSection) => {
   const updated  = sectionData.map((section)=> section._id == sectionId? updatedSection : section );
   console.log(updated , "updated")
   setSection(updated)
  };


  const totalSections = sectionData?.length;
  const totalLectures = sectionData.reduce(
    (sum, section) => sum + section.items.length,
    0
  );
  const totalDuration = "3h 45m";

  return (
    <div className="flex justify-between">

      {!isExpanded ? (  
      <div className="max-w-3xl mt-14 p-4 font-sans w-1/2">
        <h2 className="text-2xl font-bold mb-4">Course content</h2>
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <span>
            {totalSections} sections • {totalLectures} lectures •{" "}
            {totalDuration} total length
          </span>
          <button
            className="text-blue-600 hover:underline"
            onClick={() =>
              setExpandedSections(
                expandedSections.length ? [] : sectionData.map((s) => s._id)
              )
            }
          >
            {expandedSections.length
              ? "Collapse all sections"
              : "Expand all sections"}
          </button>
        </div>

        {sectionData.map((section) => (
          <div
            key={section._id}
            className="mb-2 border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section._id)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                {expandedSections.includes(section._id) ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
                <span className="ml-2 font-semibold">{section.title}</span>
              </div>
              <span className="text-sm text-gray-600">
                {section.items.length} lecture
                {section.items.length !== 1 ? "s" : ""}
              </span>
            </button>

            {expandedSections.includes(section._id) && (
              <div className="bg-white">
                {section.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center p-4 hover:bg-gray-50 border-t border-gray-200"
                  >
                    {item.type === "video" ? <Play /> : <FileText />}
                    <div className="ml-3 flex-grow">
                      <h3 className="font-medium">{item.title}</h3>
                      {item.description && (
                        <p
                          className="text-sm text-gray-600 mt-1 cursor-pointer"
                          onClick={() => setItem(item)}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.duration && (
                      <span className="text-sm text-gray-600">
                        {item.duration}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <button
              className="flex  w-32 bg-gray-800  text-white text-center float-right text-md shadow-md justify-center border border-b"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

) :( 
  <>
  {sectionData.map((section , index)=> (
   <Section key={index} section={section} onUpdate={(updatedSection)=>{updateSection(section._id , updatedSection) }}/>
  ))}
  
  </>
  

)}

      <div className=" w-1/2  mt-14 mr-36 items-center justify-center flex">
      {item && ( 
        <>
         <VideoPlayer fileUrl={item.fileUrl} />
         <div className="column flex">
          <label onClick={()=>setItem()} className="cursor-pointer"> 
         <X className="size-8" />
         <p>close</p>

         </label>

         </div>
         

        </>
       
      )}
      </div>
    </div>
  );
}





// {values.sections.map((section, index) => (
//   <Section
//     key={section.id}
//     section={section}
//     onUpdate={(updatedSection) => {
//       updateSection(section.id, updatedSection);
//       setFieldValue(`sections.${index}`, updatedSection);
//     }}
//     onDelete={() => deleteSection(section.id)}
//     error={
//       !!validationErrors[`section_${index}`] ||
//       section.items.some(
//         (_, itemIndex) =>
//           !!validationErrors[`item_${index}_${itemIndex}`]
//       )
//     }
//     canAddContent={
//       section.title.trim() !== "" &&
//       section.items.every(
//         (item) =>
//           item.title.trim() !== "" &&
//           item.description.trim() !== "" &&
//           item.fileUrl !== ""
//       )
//     }
//   />
// ))}
