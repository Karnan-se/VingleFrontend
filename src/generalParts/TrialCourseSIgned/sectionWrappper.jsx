import { useEffect } from "react";
import { Formik, Form, useFormik } from "formik";
import { useCourseContext } from "./ContextCourse";
import { Section } from "./section";
import { validationSchema } from "./service";
import { secondFromIntialErrors } from "./service";
import { motion } from "framer-motion";

export default function SectionWrapper({ secondformError }) {
  const {
    section,
    setSection,
    addSection,
    setSecondError,
  } = useCourseContext();

  const handleSubmit = (values) => {
    console.log("Final Form Values:", values);
  };

  return (
    <div className="w-1/2 flex flex-col">
      <Formik
        initialValues={{ sections: section }}
        validationSchema={validationSchema}
        initialErrors={secondFromIntialErrors}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, setFieldValue }) => {
          useEffect(() => {
            setSection(values.sections);
            console.log(errors, "error");
            setSecondError(errors);
          }, [values.sections, setSection, errors]);

          return (
            <Form>
              <motion.button
                type="button"
                className="mb-5 w-1/2 rounded-md h-10 bg-yellow-100 hover:shadow-md"
                onClick={addSection}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Add Section
              </motion.button>

              {Array.isArray(values.sections) &&
                values.sections.map((sect, index) => (
                  <Section
                    key={sect.id}
                    section={sect}
                    sectionIndex={index}
                    setFieldValue={setFieldValue}
                    errors={errors.sections?.[index]}
                  />
                ))}

              <button
                type="submit"
                className="w-full h-10 bg-yellow-100 hover:bg-yellow-200 text-md text-black hover:shadow-md"
              >
                Save Course
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
