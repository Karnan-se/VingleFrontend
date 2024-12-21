"use client";

import { useState } from "react";
import { Formik, Form, Field, FieldArray, useField } from "formik";
import * as Yup from "yup";
import { Eye, X } from 'lucide-react';
import { tutorApi } from "../../axios/axiosInstance";
import {useDispatch} from "react-redux"
import { setUserCredentials } from "../../features/authSlice";
import {useNavigate} from  "react-router-dom"


const validationSchema = Yup.object().shape({
  headline: Yup.string().required("Headline is required"),
  skills: Yup.array().min(1, "At least one skill is required"),
  degree: Yup.string().required("Degree is required"),
  qualification: Yup.string().required("Qualification is required"),
  experience: Yup.string().required("Experience is required"),
  resume: Yup.mixed().required("Resume is required"),
});

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...field}
        {...props}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

const CustomTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        {...field}
        {...props}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

const CustomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        {...field}
        {...props}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {props.children}
      </select>
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

const FileViewModal = ({ isOpen, onClose, file, onDelete, fieldName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">File Preview</h2>
        </div>
        <div className="flex-grow overflow-auto p-4">
          {file && (
            file.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(file)} alt="File preview" className="max-w-full h-auto" />
            ) : (
              <iframe src={URL.createObjectURL(file)} className="w-full h-full min-h-[70vh]" />
            )
          )}
          {!file && <p>No file selected</p>}
        </div>
        <div className="p-4 border-t flex justify-end space-x-2">
          <button
            onClick={() => {
              onDelete(fieldName);
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function InstructorApplicationForm() {
  const [filePreview, setFilePreview] = useState(null);
  const [currentField, setCurrentField] = useState(null);
  const [submissionSummary, setSubmissionSummary] = useState(null);

 

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    headline: "",
    skills: [],
    degree: "",
    qualification: "",
    experience: "",
    resume: null,
    certifications: [],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Form submitted", values);
    const formData = new FormData();
        formData.append("headline", values.headline);
        formData.append("degree", values.degree);
        formData.append("qualification", values.qualification);
        formData.append("experience", values.experience);
    
       
        values.skills.forEach((skill, index) => {
          formData.append(`skills[${index}]`, skill);
        });
    
        
        if (values.resume) {
          formData.append("resume", values.resume);
        }
    
        if(values.certifications){
            values.certifications.forEach((cert, index) => {
                formData.append(`certifications[${index}][title]`, cert.title);
                formData.append(`certifications[${index}][issuer]`, cert.issuer);
                formData.append(`certifications[${index}][date]`, cert.date);
                if (cert.file) {
                  formData.append(`certificateUrl`, cert.file);
                }
        });
        console.log(formData, "fomaDta")
        try {
          const response = await tutorApi.post("/applicationForm", formData,{withCredentials:true} ,{
            headers: {
              "Content-Type": "multipart/form-data", 
            },
          });
          
          const userDetail = response.data.message;
          console.log(userDetail.updateUserDetail)
          dispatch(setUserCredentials(userDetail.updateUserDetail));
          navigate("/")
  
        } catch (error) {
          
        }
      


        }
       
    setSubmitting(false);
  };

  const handleFileDelete = (fieldName, setFieldValue, values) => {
    if (fieldName === "resume") {
      setFieldValue("resume", null);
    } else if (fieldName.startsWith("certifications")) {
      const [, index] = fieldName.split(".");
      const newCertifications = [...values.certifications];
      newCertifications[index].file = null;
      setFieldValue("certifications", newCertifications);
    }
    setFilePreview(null);
    setCurrentField(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
          <h1 className="text-3xl font-bold">Instructor Application Form</h1>
          <p className="mt-2">Fill out the details below to apply as an instructor.</p>
        </div>
        <div className="p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form  encType="multipart/form-data"   className="space-y-6">
                <CustomInput
                  name="headline"
                  label="Headline"
                  placeholder="Enter your professional headline"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <FieldArray name="skills">
                    {({ push, remove }) => (
                      <>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {values.skills.map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded flex items-center">
                              {skill}
                              <button type="button" onClick={() => remove(index)} className="ml-1 text-blue-600 hover:text-blue-800">
                                <X size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Add a skill"
                            className="flex-grow px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const newSkill = e.target.value.trim();
                                if (newSkill && !values.skills.includes(newSkill)) {
                                  push(newSkill);
                                  e.target.value = '';
                                }
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.querySelector('input[placeholder="Add a skill"]');
                              const newSkill = input.value.trim();
                              if (newSkill && !values.skills.includes(newSkill)) {
                                push(newSkill);
                                input.value = '';
                              }
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          >
                            Add
                          </button>
                        </div>
                        {touched.skills && errors.skills && (
                          <p className="mt-1 text-sm text-red-500">{errors.skills}</p>
                        )}
                      </>
                    )}
                  </FieldArray>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomSelect name="degree" label="Degree"  placeholder="Select your highest degree">

                    <option value="">Select your highest degree</option>
                    <option value="bachelors">Bachelor's</option>
                    <option value="masters">Master's</option>
                    <option value="phd">Ph.D.</option>
                  </CustomSelect>

                  <CustomInput
                    name="qualification"
                    label="Qualification"
                    placeholder="Enter your qualifications"
                  />
                </div>

                <CustomTextarea
                  name="experience"
                  label="Experience"
                  placeholder="Describe your relevant experience"
                  rows={4}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resume (PDF)
                  </label>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      setFieldValue("resume", e.currentTarget.files[0]);
                    }}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  />
                  {touched.resume && errors.resume && (
                    <p className="mt-1 text-sm text-red-500">{errors.resume}</p>
                  )}
                  {values.resume && (
                    <div className="flex items-center mt-2">
                      <p className="text-sm text-gray-500 mr-2">
                        Selected file: {values.resume.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          if (values.resume) {
                            setFilePreview(values.resume);
                            setCurrentField("resume");
                          }
                        }}
                        className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certifications (Optional)
                  </label>
                  <FieldArray name="certifications">
                    {({ push, remove }) => (
                      <>
                        {values.certifications.map((cert, index) => (
                          <div
                            key={index}
                            className="mb-4 p-4 border border-gray-200 rounded-md shadow-sm relative"
                          >
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                              <X size={20} />
                            </button>
                            <CustomInput
                              name={`certifications.${index}.title`}
                              label="Certification Title"
                              placeholder="Enter certification title"
                            />
                            <CustomInput
                              name={`certifications.${index}.issuer`}
                              label="Certification Issuer"
                              placeholder="Enter certification issuer"
                            />
                            <CustomInput
                              name={`certifications.${index}.date`}
                              label="Certification Date"
                              type="date"
                            />
                            <div className="mt-2">
                              <label
                                htmlFor={`cert-file-${index}`}
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Certificate File (PDF or Image)
                              </label>
                              <input
                                id={`cert-file-${index}`}
                                type="file"
                                accept=".pdf,image/*"
                                onChange={(e) => {
                                  setFieldValue(`certifications.${index}.file`, e.currentTarget.files[0]);
                                }}
                                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                              />
                              {cert.file && (
                                <div className="flex items-center mt-2">
                                  <p className="text-sm text-gray-500 mr-2">
                                    Selected file: {cert.file.name}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (cert.file) {
                                        setFilePreview(cert.file);
                                        setCurrentField(`certifications.${index}.file`);
                                      }
                                    }}
                                    className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                  >
                                    <Eye size={18} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push({ title: "", issuer: "", date: "", file: null })}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          Add Certification
                        </button>
                      </>
                    )}
                  </FieldArray>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                >
                  Submit Application
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <FileViewModal
        isOpen={!!filePreview}
        onClose={() => setFilePreview(null)}
        file={filePreview}
        onDelete={(fieldName) => handleFileDelete(fieldName, setFieldValue, values)}
        fieldName={currentField}
      />

      {submissionSummary && (
        <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-green-500 text-white p-4">
            <h2 className="text-2xl font-bold">Submission Summary</h2>
          </div>
          <div className="p-6 space-y-4">
            <p><strong>Headline:</strong> {submissionSummary.headline}</p>
            <p><strong>Skills:</strong> {submissionSummary.skills.join(", ")}</p>
            <p><strong>Degree:</strong> {submissionSummary.degree}</p>
            <p><strong>Qualification:</strong> {submissionSummary.qualification}</p>
            <p><strong>Experience:</strong> {submissionSummary.experience}</p>
            <p><strong>Resume:</strong> {submissionSummary.resume ? submissionSummary.resume.name : "Not provided"}</p>
            <div>
              <strong>Certifications:</strong>
              <ul className="list-disc pl-5 mt-2">
                {submissionSummary.certifications.map((cert, index) => (
                  <li key={index}>
                    {cert.title} - {cert.issuer} ({cert.date})
                    {cert.file ? ` - File: ${cert.file.name}` : " - No file"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

