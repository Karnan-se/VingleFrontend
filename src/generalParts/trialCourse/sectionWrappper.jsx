import { useEffect } from "react";
import { Formik, Form, useFormik } from "formik";
import { useCourseContext } from "./ContextCourse";
import { Section } from "./section";
import { validationSchema } from "./service";

export default function SectionWrapper({secondformError}) {
  const { section, setSection, addSection , setSecondError  } = useCourseContext();

  const handleSubmit = (values) => {
    console.log("Final Form Values:", values);
    
  };

 

  return (
    <div className="w-1/2 flex flex-col">
      <Formik
        initialValues={{ sections: section }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, setFieldValue }) => {
          
          useEffect(() => {
            setSection(values.sections);
            console.log(errors , "error")
            setSecondError(errors);
 
          }, [values.sections, setSection , errors]);

          


          return (
            <Form>
              <button type="button " className="mb-5 w-1/2 rounded-md hover:shadow-md  h-10 bg-yellow-100" onClick={addSection}>
                Add Section
              </button>

              {values.sections.map((sect, index) => (
                <Section key={sect.id} section={sect} sectionIndex={index} setFieldValue={setFieldValue} errors={errors.sections?.[index]}/>
              ))}

              <button type="submit" className="w-full h-10 bg-yellow-100 hover:bg-yellow-200 text-md text-black hover:shadow-md">
                Save Course
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
