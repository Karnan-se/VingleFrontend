"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@nextui-org/react";
import { Section } from "./section";
import { Input } from "@nextui-org/react";
import { Check } from "lucide-react";
import { Textarea } from "@nextui-org/react";
import { tutorApi } from "../../axios/axiosInstance";
import { useSelector } from "react-redux";

export function CourseCreator() {
  const tutorInfo = useSelector((state) => state.tutor.tutorInfo);

  const [course, setCourse] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    thumbnail: null,
    learningObjectives: [],
    sections: [],
  });

  const [newObjective, setNewObjective] = useState("");

  const [validationErrors, setValidationErrors] = useState({});

  const categories = [
    { value: "development", label: "Development" },
    { value: "business", label: "Business" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
  ];

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCourse({
        ...course,
        thumbnail: file,
      });
    }
  };

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setCourse({
        ...course,
        learningObjectives: [
          ...(course?.learningObjectives || []),
          newObjective.trim(),
        ],
      });
      setNewObjective("");
    }
  };

  const removeObjective = (index) => {
    setCourse({
      ...course,
      learningObjectives: course.learningObjectives.filter(
        (_, i) => i !== index
      ),
    });
  };

  const addSection = () => {
    const newSection = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      items: [],
    };
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: [...prevCourse.sections, newSection],
    }));
  };

  const updateSection = (sectionId, updatedSection) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: prevCourse.sections.map((section) =>
        section.id === sectionId ? updatedSection : section
      ),
    }));
  };

  const deleteSection = (sectionId) => {
    // setCourse({
    //   sections: course.sections.filter((section) => section.id !== sectionId),
    // })
    setCourse((prevCourse) => ({
      ...prevCourse,
      sections: prevCourse.sections.filter(
        (section) => section.id !== sectionId
      ),
    }));
  };

  const getTotalStats = () => {
    const totalSections = course.sections.length;
    const totalLectures = course.sections
      ? course.sections.reduce((acc, section) => acc + section.items.length, 0)
      : 0;
    return { totalSections, totalLectures };
  };

  const validateCourse = () => {
    const errors = {};
    course.sections.forEach((section, sectionIndex) => {
      if (!section.title.trim()) {
        errors[`section_${sectionIndex}`] = true;
      }
      section.items.forEach((item, itemIndex) => {
        if (!item.title.trim() || !item.description.trim() || !item.fileUrl) {
          errors[`item_${sectionIndex}_${itemIndex}`] = true;
        }
      });
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveCourse = async () => {
    if (validateCourse()) {
      // console.log('Course saved:', course)
      const updatedCourse = { ...course, tutorId: tutorInfo._id };
      console.log(updatedCourse, "course wiith tutorId");
      try {
        const response = await tutorApi.post("/createCourse", {
          updatedCourse,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      swal({
        icon: "error",
        text: "some field are empty",
        title: "validation Error",
      });
    }
  };

  const { totalSections, totalLectures } = getTotalStats();

  const canAddNewSection = course.sections.every(
    (section) =>
      section.title.trim() !== "" &&
      section.items.every(
        (item) =>
          item.title.trim() !== "" &&
          item.description.trim() !== "" &&
          item.fileUrl !== ""
      )
  );

  return (
    <>
      <div className="max-w-3xl mx-auto py-8 px-4 border focus-visible:bg-none my-20 shadow-md space-y-10">
        <div className="w-full flex justify-center">
        <h1 className="font-bold ">Create Course</h1>
        </div>
       
        <Input
          placeholder="Enter the course Name"
          className="w-1/2 border "
          labelPlacement="outside"
          
          value={course.name}
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <Textarea
          label="Description"
          placeholder={course.description}
          className="border px-2 "
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
          variant="bordered"
          minRows={3}
        />

        <div className="flex gap-9">
          <select
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={course.category}
            onChange={(e) => setCourse({ ...course, category: e.target.value })}
          >
            <option value="" disabled>
              Select course category
            </option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <div className="w-1/2 relative flex items-center">
            <span className="absolute left-3 text-gray-500 pointer-events-none">
              $
            </span>
            <input
              type="number"
              placeholder="Enter course price"
              value={course.price}
              onChange={(e) => setCourse({ ...course, price: e.target.value })}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Course Thumbnail</p>
          <div className="flex items-center gap-4">
            {course.thumbnail && (
              <img
                src={URL.createObjectURL(course.thumbnail)}
                alt="Course thumbnail preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                variant="bordered"
                isInvalid={validationErrors.thumbnail}
                description="Upload a 16:9 image (recommended size: 1280x720px)"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium">What Students Will Learn</p>
          <div className="flex gap-2">
            <Input
              className="flex-1"
              placeholder="Enter a learning objective"
              value={newObjective}
              onChange={(e) => setNewObjective(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddObjective();
                }
              }}
              variant="bordered"
              isInvalid={
                validationErrors.learningObjectives &&
                course.learningObjectives.length === 0
              }
            />
            <Button
              onClick={handleAddObjective}
              className="flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>

          {course.learningObjectives?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {course.learningObjectives?.map((objective, index) => (
                <div key={index} className="flex items-start gap-2 group">
                  <Check className="w-4 h-4 mt-1 flex-shrink-0 text-blue-500" />
                  <p className="text-sm flex-1">{objective}</p>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    color="danger"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeObjective(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 border my-5 py-20 mb-28 shadow-md">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Course Content</h1>
            <p className="text-default-500">
              {totalSections} sections • {totalLectures} lectures
            </p>
          </div>
         
        </div>

        <div className="space-y-4">
          {course.sections.map((section, index) => (
            <Section
              key={section.id}
              section={section}
              onUpdate={(updatedSection) =>
                updateSection(section.id, updatedSection)
              }
              onDelete={() => deleteSection(section.id)}
              error={
                !!validationErrors[`section_${index}`] ||
                section.items.some(
                  (_, itemIndex) =>
                    !!validationErrors[`item_${index}_${itemIndex}`]
                )
              }
              canAddContent={
                section.title.trim() !== "" &&
                section.items.every(
                  (item) =>
                    item.title.trim() !== "" &&
                    item.description.trim() !== "" &&
                    item.fileUrl !== ""
                )
              }
            />
          ))}

          {canAddNewSection && (
            <Button
              color="primary"
              onClick={addSection}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4 border" />
              Add Section
            </Button>
          )}

          {course.sections.length === 0 && (
            <div className="text-center py-12 bg-default-50 rounded-lg">
              <p className="text-default-500 mb-4">No sections added yet</p>
              <Button
                color="primary"
                onClick={addSection}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Your First Section
              </Button>
            </div>
          )}
        </div>

        
      </div>
<div className="max-w-3xl  mx-auto  h-20 ">


      {course.sections.length > 0 && (
            <Button
              color="primary"
              onClick={handleSaveCourse}
              className=" float-right gap-2 border mb-20  hover:bg-yellow-500 bg-gray-400 text-white "
            >
              Save Course
            </Button>
          )}
</div>
      
    </>
  );
}
