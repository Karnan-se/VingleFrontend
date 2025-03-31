import { ChevronDown, PlayCircle } from "lucide-react";
import { useCourseContext } from "./ContextCourse";
import VideoPlayer from "../viewCourse/VideoPlayer";
import ProgressBar from "../startLearning/ProgressBar";
import { useEffect, useState } from "react";
import { usepdfContext } from "../../Components/context/pdfRenderContext";
import TrailVideoPlayer from "./TrialVideoPlayer";
import { FileText } from "lucide-react";


export default function StudentsView() {
  const { basicForm, setBasicForm, basicError, section } = useCourseContext();
  const [openSections, setOpenSection] = useState([]);
  const [fileUrl, setFileUrl] = useState();
  const [itemsId, setItems] = useState();
  const { renderPdf, setOPenPdf, setPdfData } = usepdfContext();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    console.log(section, "sections");
  }, [section]);

  useEffect(() => {
    if (fileUrl) {
      const objectUrl = URL.createObjectURL(fileUrl);
      setPdfUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [fileUrl]);

  const toggleSection = (sectionId) => {
    setOpenSection((prev) =>
      prev.includes(sectionId)
        ? prev.filter((_id) => _id != sectionId)
        : [...prev, sectionId]
    );
  };

  const handlefileUrl = (fileUrl, itemId) => {

    setFileUrl(fileUrl);
    setItems(itemId);
    if (fileUrl.type == "application/pdf") {
      setFileUrl(null);
      console.log("it is pdf");
      setFileUrl(null);
      setPdfData(URL.createObjectURL(fileUrl));
      setOPenPdf(true);
      console.log("it is completed");
    }
  };

  return (
    <>
      <div className=" flex  p-10 w-full">
        <div className="mb-8 w-1/2 ">
          <h2 className="text-xl font-bold mb-4">Course Content</h2>
          <div className="border rounded-lg divide-y">
            {section.map((section) => (
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
                          <PlayCircle className="w-5 h-5 mt-1" /> : <FileText  className="w-5 h-5 mt-1"/> 
}
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
                        {/* {progress && (
                            <ProgressBar
                              progress={
                                progress.completedItems.find(
                                  (c) => c.itemId == item._id
                                )?.percentageCompleted || 0
                              }
                            />
                          )} */}
                      </>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex p-5 min-w-3xl">
          {fileUrl && section && section.length > 0 && (
            <>
              {section.length > 0 &&  section.map((sec, index) =>
                sec.items.map((item, itemIndex) =>
                  item.type === "video" && item.fileUrl == fileUrl ? (
                    <TrailVideoPlayer
                      key={`${index}-${itemIndex}`}
                      fileUrl={URL.createObjectURL(fileUrl)}
                      itemId={itemsId}
                    />
                  ) : (
                    <div key={`${index}-${itemIndex}`}>
                      {/* {pdfUrl && setPdfData(pdfUrl)} */}
                    </div>
                  )
                )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
