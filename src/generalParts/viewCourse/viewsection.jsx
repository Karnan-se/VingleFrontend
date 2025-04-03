import { ChevronDown, ChevronUp, Play, FileText } from "lucide-react";
import { Section } from "./editableSection";
import { X } from "lucide-react";
import { validateSectionData } from "./validateSectionData";
import { sectionValidation } from "./sectionValidation";
import { updateSectionDetail } from "./updateSectionDetail";
import { useLoading } from "../preloader/LoadingContext";
import { addNewSection } from "./addnewSection";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { tutorApi } from "../../axios/axiosInstance";
import { uploadtoCloudinarySignedURL } from "../../features/api/uploadCloudinary";

import React, { useEffect, useState } from "react";
import VideoPlayer1 from "./VideoPlayerEditCourse";

export default function CourseSection({ sectionData, setSection, course_id }) {
  console.log(sectionData, "sectionData");
  const { isLoading, setLoading } = useLoading();

  const [error, setError] = useState([]);
  const sectionRef = useRef(null);
  const [editable, setEditable] = useState();
  const [expandedSections, setExpandedSections] = useState([]);
  const [item, setItem] = useState();
  const [isExpanded, setExpanded] = useState(false);
  const [isAdded, setAdded] = useState(false);
  const [newSection, setNewSection] = useState({
    title: "",
    items: [{ title: "", type: "video", duration: "", description: "" }],
  });

  const navigate = useNavigate();

  const [newError, setNewError] = useState({ title: "", items: [] });

  const deleteSection = (sectionid) => {
    const afterDetele = sectionData.filter(
      (section) => section._id !== sectionid
    );
    console.log(afterDetele, "deleted");
    setSection(afterDetele);
  };

  const handleEdit = (e, section_id) => {
    e.preventDefault();
    setEditable(section_id);
    setExpanded(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    console.log("saved");
    const validationErrors = validateSectionData(sectionData);

    const hasError = validationErrors.some((err) => {
      if (err.title?.length > 0) return true;
      if (Array.isArray(err.items)) {
        return err.items.some(
          (itemError) =>
            itemError.title?.length > 0 || itemError.description?.length > 0
        );
      }
      return false;
    });

    if (hasError) {
      console.log("Form submission failed due to validation errors.");
      setError(validationErrors);
      console.log(validationErrors);
      return;
    }

    try {
      console.log("this is thr funxtion to edit");

      setLoading(true);
      const updatedSectionData = await Promise.all(
        sectionData.map(async (section) => {
          section.items = await Promise.all(
            section.items.map(async (item) => {
              if (!item.fileUrl) return item;

              if (typeof item.fileUrl !== "string") {
                let fileType = "auto";
                const response = await tutorApi.post("/get-signedUrl", {
                  fileType,
                });
                if (!response.data.signedUrl) {
                  throw new Error("Failed to get signed-URL");
                }
                const signedUrl = response.data.signedUrl;
                const secure_url = await uploadtoCloudinarySignedURL(
                  item.fileUrl,
                  signedUrl
                );
                item.fileUrl = secure_url;
              }
              return item;
            })
          );
          return section;
        })
      );

      console.log(updatedSectionData, "updatedSectionData");
      console.log(editable, "Editable");

      const updatedSection = await updateSectionDetail( editable,   updatedSectionData);
      console.log(updatedSection, "updatedSection");
      sectionRef.current = updatedSection;
      console.log(sectionData, "section Data is gthe thiosg kjbnkjb");
      setSection([...updatedSection]);
      setExpanded(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const updateSection = (sectionId, updatedSection) => {
    const updated = sectionData.map((section) =>
      section._id == sectionId ? updatedSection : section
    );
    console.log(updated, "updated");
    setSection(updated);
  };

  const updateNewSection = (updatedSection) => {
    console.log(updatedSection, "updatedSection");
    setNewSection((prevSection) => ({
      ...prevSection,
      ...updatedSection,
    }));
  };

  const createNewSection = async () => {
    const addError = sectionValidation(newSection);

    const hasError = () => {
      if (addError.title.length > 0) return true;
      return addError.items.some(
        (itemError) =>
          itemError.title.length > 0 || itemError.description.length > 0
      );
    };

    if (hasError()) {
      console.log("Form submission failed due to validation errors.");
      setNewError(addError);
      return;
    }
  

    const updatedSection = { ...newSection };
    
    setLoading(true);
    updatedSection.items = await Promise.all(
      updatedSection.items.map(async (item) => {
        if (!item.fileUrl) {
          return item; 
        }
    
        let fileType = "auto";
        const response = await tutorApi.post("/get-signedUrl", { fileType });
    
        if (!response.data.signedUrl) {
          throw new Error("Failed to get signed URL");
        }
    
        const signedUrl = response.data.signedUrl;
        const secure_url = await uploadtoCloudinarySignedURL(item.fileUrl, signedUrl);
    
        return { ...item, fileUrl: secure_url }; 
      })
    );
    
    console.log(updatedSection , "helloe heelo ehello ehelelo heeelo heelloe heleleoeo  ehgeelelke heh jebhje  ejhbejhbehj j ebekbe ")

    try {
      if (updatedSection) {
        const newSection = await addNewSection(course_id, updatedSection);
      }
      setExpanded(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalSections = sectionData?.length;
  const totalLectures = sectionData.reduce(
    (sum, section) => sum + section.items.length,
    0
  );
  const totalDuration = "3h 45m";

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
          {!isAdded ? (
            <>
              {!isExpanded ? (
                <div className="p-6">
                  <h2 className="text-3xl font-bold mb-6 text-center">
                    Course content
                  </h2>
                  <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
                    <span>
                      {totalSections} sections • {totalLectures} lectures •{" "}
                      {totalDuration} total length
                    </span>
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() =>
                        setExpandedSections(
                          expandedSections.length
                            ? []
                            : sectionData.map((s) => s._id)
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
                      className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(section._id)}
                        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center">
                          {expandedSections.includes(section._id) ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                          <span className="ml-2 font-semibold">
                            {section.title}
                          </span>
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
                              {item.type === "video" ? (
                                <Play className="w-5 h-5" />
                              ) : (
                                <FileText className="w-5 h-5" />
                              )}
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
                        className="w-full bg-gray-800 text-white py-2 px-4 hover:bg-gray-700 transition-colors"
                        onClick={(e) => handleEdit(e, section._id)}
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                  <button
                    className="w-full bg-gray-800 text-white py-2 px-4 hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      setAdded(true); // Enable add mode
                    }}
                  >
                    Add new Section
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-gray-100 border shadow-lg border-black">
                  {sectionData
                    .filter((section) => editable === section._id)
                    .map((section, index) => (
                      <div key={section._id} className="mb-6">
                        <Section
                          key={section._id}
                          section={section}
                          onUpdate={(updatedSection) => {
                            updateSection(section._id, updatedSection);
                          }}
                          canAddContent={""}
                          error={error[index]}
                          onDelete={() => deleteSection(section._id)}
                        />
                      </div>
                    ))}
                  <div className="mt-6 text-center">
                    <button
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="p-6 bg-gray-100 border shadow-lg border-black">
                <Section
                  key="new-section"
                  section={newSection}
                  onUpdate={(newSection) => {
                    updateNewSection(newSection);
                  }}
                  canAddContent={true}
                  error={newError}
                  onDelete={() => setAdded(false)}
                />
              </div>

              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold"
                onClick={createNewSection}
              >
                Save Changes
              </button>
            </>
          )}
        </div>

        {item && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <button
                  onClick={() => setItem(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <VideoPlayer1 fileUrl={item.fileUrl} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
