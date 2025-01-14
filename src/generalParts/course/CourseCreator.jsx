"use client";

import { useEffect, useState } from "react";
import { Plus } from 'lucide-react';
import { Button } from "@nextui-org/react";
import { Section } from "./section";
import { Input } from "@nextui-org/react";
import { Check } from 'lucide-react';
import { Textarea } from "@nextui-org/react";
import { adminApi, tutorApi } from "../../axios/axiosInstance";
import { useSelector } from "react-redux";
import { createformData } from "../../features/formData/createFormData";
import { Formik, Form, ErrorMessage } from 'formik';
import { useLoading } from "../preloader/LoadingContext";


import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

export function CourseCreator() {


  const {isLoading, setLoading} =  useLoading()
  const navigate =useNavigate(); 
 
  const tutorInfo = useSelector((state) => state.tutor.tutorInfo);
  const [categories , setCategories] = useState()

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

useEffect(()=>{
 const fetchCategory = async ()=>{
  const categoriesStored = await adminApi.get("/getCategories")
  
  const category =categoriesStored.data.data.map((category)=> ({ ...category, value:category.name,  }))

  setCategories(category)
  console.log(category , "category")
  
  return category

 }
 fetchCategory()

},[])
 



  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCourse({
        ...course,
        thumbnail: file,
      });
    }
  };

  useEffect(()=>{
    console.log(course)
  },[course])

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

  const handleSaveCourse = async (values, { setSubmitting }) => {
    if (validateCourse()) {
      setLoading(true)
      const updatedCourse = { ...values, tutorId: tutorInfo._id };
      const form = createformData(updatedCourse)
     
      try {
        const response = await tutorApi.post("/createCourse",form,{withCredentials:true} ,{
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        })
        if(response){
          setLoading(false);
          swal({
            icon:"success",
            title:"Success",
            text:"course Saved Sucessfully",
          })
          navigate("/tutor/courses")
          
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    } else {
      swal({
        icon: "error",
        text: "some fields are empty",
        title: "validation Error",
      });
      navigate("tutor/course")
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Course name is required'),
    description: Yup.string().trim().required('Description is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number().positive('Price must be positive').required('Price is required'),
    learningObjectives: Yup.array().of(Yup.string().trim().required('Learning objective cannot be empty')),
    thumbnail: Yup.mixed()
    .required('Thumbnail is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
    })
    .test('fileSize', 'File size must be less than 2MB', (value) => {
      return value && value.size <=   5 * 1024 * 1024; 
    }),
    sections: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().trim().required('Section title is required'),
        items: Yup.array().of(
          Yup.object().shape({
            title: Yup.string().trim().required('Item title is required'),
            description: Yup.string().trim().required('Item description is required'),
            fileUrl: Yup.string().required('File is required'),
          })
        ),
      })
    ),
  });

  return (
    <Formik
      initialValues={course}
      validationSchema={validationSchema}
      onSubmit={handleSaveCourse}
      enableReinitialize
    >
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
        const addName = (e) => {
          handleChange(e); 
          setCourse((prev)=> ({...prev, name:e.target.value}))
          console.log("New Name Added:", e.target.value); 
        };
        const addDescription =(e)=>{
          handleChange(e)
          setCourse((prev)=> ({...prev, description:e.target.value}))
        }

        const addSelect =(e)=>{
          handleChange(e)
          setCourse((prev)=> ({...prev, category:e.target.value}))
        }
        const addPrice =(e)=>{
          handleChange(e)
          setCourse((prev)=> ({...prev, price:e.target.value}))


        }

  
        return (
          <>
          <div className="w-full">

          
          
        
          <Form encType="multipart/form-data">
            <div className="max-w-3xl mx-auto py-8 px-4 border focus-visible:bg-none my-20 border-black space-y-10 shadow-2xl ">
              <div className="w-full flex justify-center">
                <h1 className="font-bold text-2xl ">Create Course</h1>
              </div>
  
              <Input
                placeholder="Enter the course Name"
                className="w-full border  rounded-md shadow-md focus-visible:not-sr-only"
                labelPlacement="outside"
                name="name"
                value={values.name}
                onChange={addName} 
                onBlur={handleBlur}
              />
              <ErrorMessage name="name" component="div" className="text-red-500" />
  
              <Textarea
                label="Description"
                placeholder={values.description}
                className="border px-2  rounded-2xl"
                name="description"
                onChange={addDescription}
                onBlur={handleBlur}
                variant="bordered"
                minRows={3}
              />
              <ErrorMessage name="description" component="div" className="text-red-500" />
  
              <div className="flex gap-9">
                {categories && ( 
                <select
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={values.category}
                  name="category"
                  onChange={addSelect}
                  onBlur={handleBlur}
                >
                  <option value="" disabled>
                    Select course category
                  </option>
                  {categories.map((category) => (
                    <option key={category.value} value={category._id}>
                      {category.value}
                    </option>
                  ))}
                </select>
                )}
                <ErrorMessage name="category" component="div" className="text-red-500" />
  
                <div className="w-1/2 relative flex items-center">
                  <span className="absolute left-3 text-gray-500 pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Enter course price"
                    name="price"
                    value={values.price}
                    onChange={addPrice}
                    onBlur={handleBlur}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <ErrorMessage name="price" component="div" className="text-red-500" />
              </div>
  
              <div className="space-y-2">
                <p className="text-sm font-medium">Course Thumbnail</p>
                <div className="flex items-center gap-4">
                  {values.thumbnail && (
                    <img
                      src={URL.createObjectURL(values.thumbnail)}
                      alt="Course thumbnail preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      
                      onChange={(e) => {
                        handleThumbnailChange(e);
                        setFieldValue("thumbnail", e.currentTarget.files[0]);
                      }}
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
                      values.learningObjectives.length === 0
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
  
                {values.learningObjectives?.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {values.learningObjectives?.map((objective, index) => (
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
  
            <div className="max-w-3xl mx-auto px-4 border my-5 py-20 mb-28  border-black shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Course Content</h1>
                  <p className="text-default-500">
                    {totalSections} sections • {totalLectures} lectures
                  </p>
                </div>
              </div>
  
              <div className="space-y-4">
                {values.sections.map((section, index) => (
                  <Section
                    key={section.id}
                    section={section}
                    onUpdate={(updatedSection) => {
                      updateSection(section.id, updatedSection);
                      setFieldValue(`sections.${index}`, updatedSection);
                    }}
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
              </div>
            </div>
  
            <div className="max-w-3xl  mx-auto  h-20 ">
              {values.sections.length > 0 && (
                <Button
                  color="primary"
                  type="submit"
                  className="float-right gap-2 border mb-20 hover:bg-yellow-500 bg-gray-400 text-white"
                >
                  Save Course
                </Button>
              )}
            </div>
          </Form>
          </div>
          </>
        );
      }}
    </Formik>
    
  ) };
  