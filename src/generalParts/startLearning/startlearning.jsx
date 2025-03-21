import React, { useEffect, useState } from "react";
import VideoPlayer from "../viewCourse/VideoPlayer";
import { isProgressTracked } from "../../features/api/isProgreesTracked";
import { createProgress } from "../../features/api/isProgreesTracked";
import { useSelector } from "react-redux";
import { updateProgress } from "../../features/api/isProgreesTracked";
import ProgressBar from "./ProgressBar";
import { usepdfContext } from "../../Components/context/pdfRenderContext";
import { FileText } from "lucide-react";


import { Star, PlayCircle, ChevronDown } from "lucide-react";

export default function LearningComponent({ course }) {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [progress, setProgress] = useState();
  const [itemsId, setItems] = useState();
  const [openSections, setOpenSections] = useState([]);
  const [fileUrl, setFileUrl] = useState();
  const { setOPenPdf , setPdfData} = usepdfContext()

  useEffect(()=>{
    console.log(course , "course course course")

  },[course])

  const toggleSection = (sectionId) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((_id) => _id !== sectionId)
        : [...prev, sectionId]
    );
  };

  let itemId;
  if (course) {
    itemId = course.sections
      .flatMap((section) => section.items)
      .map((item) => item._id);
  }

  useEffect(() => {
    async function getProgress() {
      try {
        const progress = await isProgressTracked(
          userInfo._id,
          course._id,
          itemId
        );
        if (progress?.message === "not tracked") {
          const create = await createProgress(userInfo._id, course._id, itemId);
          console.log(create, "create");
          return create?.Progress;
        }

        return progress?.Progress;
      } catch (error) {
        console.error("Error fetching or creating progress:", error);
        return null;
      }
    }

    getProgress().then((result) => {
      if (result) {
        console.log(result, "result tesult");
        const newProgress = result;

        console.log(newProgress, "progress Progress");

        setProgress(newProgress);
      }
    });
  }, [userInfo._id, course._id]);

  const updatePercentage = async (percentage, itemId) => {
    console.log(percentage, "percentage");
    const numericPercentage = Number(percentage);
    if (!progress) return;

    const updatedProgress = {
      ...progress,
      completedItems: progress.completedItems.map((item) =>
        item.itemId.toString() === itemId.toString()
          ? { ...item, percentageCompleted: Number.parseFloat(percentage) }
          : item
      ),
    };
    console.log(updatedProgress, "updted Progrress");

    setProgress(updatedProgress);
    try {
      const updatedProgress = await updateProgress(
        userInfo._id,
        course._id,
        itemId,
        numericPercentage
      );
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handlefileUrl = async(fileUrl, itemId) => {
    setFileUrl(fileUrl);
    setItems(itemId);
    if(fileUrl.toLowerCase().endsWith(".pdf")) {
      setFileUrl(null)
      setPdfData(fileUrl);
      setOPenPdf(true);
      const updateProgres = await updateProgress(
        userInfo._id, 
        course._id,
        itemId,
        "100"
      )
    }
  };


  const getCurrentItemPercentage = () => {
    const currentItem = progress.completedItems.find(
      (item) => item.itemId.toString() === itemsId.toString()
    );
    console.log(currentItem.percentageCompleted, "total percentage current Irem");
    return currentItem.percentageCompleted;
  };

  useEffect(() => {
    console.log(course, "course which is need to be set");
  }, [course]);
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-black text-white p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
            <p className="mb-4">{course.description}</p>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-400 text-black px-2 py-1 rounded">
                {Math.floor(course.averageRating)}
              </span>

              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < course.averageRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2">Created by: {course.tutorId.firstName || ""}</p>
          </div>
        </div>

        <div className=" flex  p-10">
          <div className="mb-8 w-1/2 ">
            <h2 className="text-xl font-bold mb-4">Course Content</h2>
            <div className="border rounded-lg divide-y">
              {course.sections.map((section) => (
                <div key={section._id} className="bg-white">
                  <button
                    onClick={() => toggleSection(section._id)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium">{section.title}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openSections.includes(section._id)
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                  {openSections.includes(section._id) && (
                    <div className="px-4 py-2 bg-gray-50">
                      {section.items.map((item) => (
                        <>
                          <div
                            key={item._id}
                            className="py-2 flex items-start gap-3 "
                          >
                            {item.type == "video" ? 
                          <PlayCircle className="w-5 h-5 mt-1" /> : <FileText  className="w-5 h-5 mt-1"/> }

                            <div>
                              <label
                                htmlFor=""
                                onClick={() =>
                                  handlefileUrl(item.fileUrl, item._id)
                                }
                              >
                                <p className="font-medium cursor-pointer">
                                  {item.title}
                                </p>
                                <p className="text-sm text-gray-600 cursor-pointer">
                                  {item.description}
                                </p>
                              </label>

                              {item.duration && (
                                <span className="text-sm text-gray-500">
                                  {item.duration} min
                                </span>
                              )}
                            </div>
                          </div>
                          {progress && (
                            <ProgressBar
                              progress={
                                progress.completedItems.find(
                                  (c) => c.itemId == item._id
                                )?.percentageCompleted || 0
                              }
                            />
                          )}
                        </>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex p-5 min-w-3xl">
            {fileUrl && progress && (
              <>
              
                <VideoPlayer
                  fileUrl={fileUrl}
                  updatePercentage={(percentage, itemId) =>
                    updatePercentage(percentage, itemId)
                  }
                  initialPercentage={getCurrentItemPercentage()}
                  itemId={itemsId}
                />
              </>
            )}
          </div>
        </div>
        
      </div>
    </>
  );
}
