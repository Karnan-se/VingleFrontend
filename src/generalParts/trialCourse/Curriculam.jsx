import { FileVideo, FileText, Trash2 } from "lucide-react";
import { Input, Textarea, Button } from "@nextui-org/react";
import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import VideoPlayer1 from "../viewCourse/VideoPlayerEditCourse";

export function CurriculumItem({ item, sectionIndex, itemIndex, setFieldValue, errors, deleteItem }) {
  const [video, setVideo] = useState();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFieldValue(`sections[${sectionIndex}].items[${itemIndex}].fileUrl`, file);
    if (file) setVideo(URL.createObjectURL(file));
  };

  const updateDuration =(duration)=>{
    console.log(duration , "duration")
    setFieldValue(`sections[${sectionIndex}].items[${itemIndex}].duration` , (duration/60))
  }

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center gap-4">
        {item.type === "video" ? (
          <FileVideo className="w-5 h-5 text-primary" />
        ) : (
          <FileText className="w-5 h-5 text-success" />
        )}

        <Field
          name={`sections[${sectionIndex}].items[${itemIndex}].title`}
          as={Input}
          placeholder="Lesson title"
        />
        <ErrorMessage
          name={`sections[${sectionIndex}].items[${itemIndex}].title`}
          component="p"
          className="text-danger"
        />

        <Button isIconOnly variant="light" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "-" : "+"}
        </Button>

        <Button isIconOnly variant="light" onClick={() => deleteItem(item.id)}>
          <Trash2 className="w-4 h-4 text-danger" />
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <p className="text-sm">Description</p>
            <Field
              name={`sections[${sectionIndex}].items[${itemIndex}].description`}
              as={Textarea}
              placeholder="Enter lesson description..."
            />
            <ErrorMessage
              name={`sections[${sectionIndex}].items[${itemIndex}].description`}
              component="p"
              className="text-danger"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm">Content File</p>
            {item.fileUrl && (
              <div className="w-full border" style={{ height: "auto", overflow: "hidden" }}>
                {item.type === "video" ? (
                  <VideoPlayer1 fileUrl={video || item.fileUrl} updateDuration={updateDuration} />
                ) : (
                  <embed src={video || item.fileUrl} type="application/pdf" width="100%" height="100%" />
                )}
              </div>
            )}

            <Input
              type="file"
              accept={item.type === "video" ? "video/*" : "application/pdf"}
              onChange={handleFileChange}
              variant="bordered"
            />
            <ErrorMessage
              name={`sections[${sectionIndex}].items[${itemIndex}].fileUrl`}
              component="p"
              className="text-danger"
            />
          </div>
        </div>
      )}
    </div>
  );
}
