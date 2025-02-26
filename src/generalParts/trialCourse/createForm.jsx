import { useFormik } from "formik";
import { ValidateSchema } from "./service";
import { initialValues } from "./service";
import { CircleX } from "lucide-react";
import { useEffect } from "react";
import { useCourseContext } from "./ContextCourse";
import { fetchCategory } from "../../features/api/fetchCategory";
import { useState } from "react";

const CreateCourseForm = () => {

  const {basicError , setBasicError , basicForm , setBasicForm} = useCourseContext()

  const [category, setCategory] = useState([])
  




  useEffect(()=>{
    const fetch = async () =>{
  try {
    
    const category = await fetchCategory()
    console.log(category , "response of category")
    setCategory(category)
    
  } catch (error) {
    console.log(error)
    throw error
    
  }

    }

    fetch()
   
  },[])




  const formik = useFormik({
    initialValues: basicForm || initialValues,
    initialErrors:{
      name: "Course name is required",
      description: "Description is required",
      category: "Category is required",
      price: "Price is required",
      learningObjectives: "At least one learning objective is required",
      thumbnail: "Thumbnail is required"
  },
    validationSchema: ValidateSchema.validationCourseForm,
    onSubmit: (values) => {
      
      setBasicForm(values)
      console.log("formSubmitted" ,  values)
      const formikErrors = formik.errors
      console.log(formikErrors , "isFinalError updation")
      setBasicError((prev)=> ( {...prev , formikErrors }))

    },
  });

  useEffect(() => {
   
    const formikErrors = formik.errors
    setBasicError((prev)=> ( {...prev , formikErrors }))
    console.log(basicError , "basicError from the cintext ")
  }, [formik.values ]);






  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Create Course</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* image */}
        {formik.values.thumbnail && (
          <div className="w-full h-40 rounded-lg mb-4  overflow-hidden">
            <img
              src={URL.createObjectURL(formik.values.thumbnail)}
              alt="Thumbnail Preview"
              className="h-full w-full object-contain"
            />
          </div>
        )}

        {/* Course Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            className="w-full p-2 border rounded"
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>

        {/* Category and Price */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              className="w-full p-2 border rounded"
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              {category && category.map((cat)=> ( <option value={cat._id}>{cat.name}</option>  )  )}
             
              
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.category}
              </p>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              className="w-full p-2 border rounded"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
            )}
          </div>
        </div>

        {/* Learning Objectives */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Learning Objectives
          </label>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              name="learningObjectives"
              className="w-full md:w-2/3 p-2 border rounded mb-2 md:mb-0"
              value={formik.values.tempObjective || ""}
              onChange={(e) =>
                formik.setFieldValue("tempObjective", e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && formik.values.tempObjective.trim()) {
                  const newObjective = formik.values.tempObjective.trim();
                  formik.setFieldValue("learningObjectives", [
                    ...formik.values.learningObjectives.filter(
                      (value) => value !== newObjective
                    ),
                    newObjective,
                  ]);
                  formik.setFieldValue("tempObjective", "");
                  e.preventDefault();
                }
              }}
              placeholder="Type objective and press Enter"
            />
            <button
              type="button"
              className="w-full md:w-1/3 p-2 bg-yellow-500 hover:bg-yellow-800 text-white rounded"
              onClick={() => {
                const newObjective = formik.values.tempObjective.trim();
                if (newObjective) {
                  formik.setFieldValue("learningObjectives", [
                    ...formik.values.learningObjectives.filter(
                      (value) =>
                        value.toLowerCase() !== newObjective.toLowerCase()
                    ),
                    newObjective,
                  ]);
                  formik.setFieldValue("tempObjective", "");
                }
              }}
            >
              + Add Objective
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {formik.values.learningObjectives.map((value, index) => (
            <div
              key={index}
              className="relative group flex items-center bg-gray-100 px-3 py-1 rounded-md shadow-sm hover:bg-gray-200 transition"
            >
              <span className="font-serif text-sm md:text-base font-medium hover:text-purple-500">
                {value}
              </span>
              <CircleX
                size={20}
                color="#df0101"
                className="ml-2 cursor-pointer opacity-0 group-hover:opacity-100 transition"
                onClick={() => {
                  formik.setFieldValue(
                    "learningObjectives",
                    formik.values.learningObjectives.filter(
                      (_, i) => i !== index
                    )
                  );
                }}
              />
            </div>
          ))}
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Thumbnail
          </label>
          <input
            type="file"
            name="thumbnail"
            className="w-full p-2 border rounded"
            onChange={(event) =>
              formik.setFieldValue("thumbnail", event.target.files[0])
            }
          />
          {formik.touched.thumbnail && formik.errors.thumbnail && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.thumbnail}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-yellow-500 hover:bg-yellow-700 text-black hover:text-white rounded transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCourseForm;
