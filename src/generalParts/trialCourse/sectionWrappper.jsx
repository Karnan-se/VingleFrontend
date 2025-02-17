import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCourseContext } from "./ContextCourse";
import { Section } from './section';
import { validationSchema } from './service';

export default function SectionWrapper() {
  const { section, setSection, addSection } = useCourseContext();

  const handleSubmit = (values) => {
    console.log("Final Form Values:", values);
  };

  return (
    <div className='w-full flex flex-col'>


    <Formik
      initialValues={{ sections: section }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, handleChange, setFieldValue }) => (
        <Form>
          <button type="button" onClick={addSection}>Add Content</button>

          {values.sections.map((sect, index) => (
            <Section
              key={sect.id}
              section={sect}
              sectionIndex={index}
              setFieldValue={setFieldValue}
              errors={errors.sections?.[index]}
            />
          ))}

          <button type="submit" className='w-full h-10 bg-yellow-600 hover:bg-yellow-300'>Save Course</button>
        </Form>
      )}
    </Formik>
    </div>
  );
}
