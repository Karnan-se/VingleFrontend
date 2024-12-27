import React, { useState } from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";

const EditApplication = () => {
  const [instructor, setInstructor] = useState({
    firstname: "John",
    lastname: "Doe",
    photo: "https://via.placeholder.com/150",
    phone: "123-456-7890",
    applicationDetails: {
      headline: "Expert Web Developer and Instructor",
      status: "accepted", // Options: "accepted", "rejected", "pending"
      degree: "Bachelor's in Computer Science",
      qualification: "Certified Full-Stack Developer",
      experience: "5 years of experience in teaching and developing web applications.",
      skills: ["JavaScript", "React", "Node.js", "CSS", "HTML", "MongoDB", "Express.js"],
      resume: "https://example.com/resume.pdf",
      certifications: [
        {
          title: "React Developer Certification",
          issuer: "Udemy",
          date: "June 2022",
          certificateUrl: "https://example.com/certificate1",
        },
      ],
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, field) => {
    const { name, value } = e.target;
    setInstructor((prev) => ({
      ...prev,
      applicationDetails: { ...prev.applicationDetails, [field]: value },
    }));
  };

  const handleSkillsChange = (e, index) => {
    const updatedSkills = [...instructor.applicationDetails.skills];
    updatedSkills[index] = e.target.value;
    setInstructor((prev) => ({
      ...prev,
      applicationDetails: { ...prev.applicationDetails, skills: updatedSkills },
    }));
  };

  const addSkill = () =>
    setInstructor((prev) => ({
      ...prev,
      applicationDetails: {
        ...prev.applicationDetails,
        skills: [...prev.applicationDetails.skills, ""],
      },
    }));

  const removeSkill = (index) =>
    setInstructor((prev) => ({
      ...prev,
      applicationDetails: {
        ...prev.applicationDetails,
        skills: prev.applicationDetails.skills.filter((_, i) => i !== index),
      },
    }));

  const handleCertificationsChange = (index, field, value) => {
    const updatedCertifications = [...instructor.applicationDetails.certifications];
    updatedCertifications[index][field] = value;
    setInstructor((prev) => ({
      ...prev,
      applicationDetails: { ...prev.applicationDetails, certifications: updatedCertifications },
    }));
  };

  const addCertification = () =>
    setInstructor((prev) => ({
      ...prev,
      applicationDetails: {
        ...prev.applicationDetails,
        certifications: [
          ...prev.applicationDetails.certifications,
          { title: "", issuer: "", date: "", certificateUrl: "" },
        ],
      },
    }));

  const removeCertification = (index) =>
    setInstructor((prev) => ({
      ...prev,
      applicationDetails: {
        ...prev.applicationDetails,
        certifications: prev.applicationDetails.certifications.filter((_, i) => i !== index),
      },
    }));

  const handleSubmit = () => {
    console.log("Updated Instructor Profile:", instructor);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="flex items-center mb-4">
          <img
            src={instructor.photo}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4 border-2 border-white"
          />
          <div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="firstname"
                  value={instructor.firstname}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="bg-transparent border-b-2 border-white text-white focus:outline-none"
                />
                <input
                  type="text"
                  name="lastname"
                  value={instructor.lastname}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="bg-transparent border-b-2 border-white text-white focus:outline-none ml-2"
                />
              </>
            ) : (
              <h1 className="text-3xl font-bold">{`${instructor.firstname} ${instructor.lastname}`}</h1>
            )}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={instructor.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="bg-transparent border-b-2 border-white text-white focus:outline-none"
              />
            ) : (
              <p className="text-sm">Phone: {instructor.phone}</p>
            )}
          </div>
        </div>
        <h2 className="text-xl font-semibold">
          {isEditing ? (
            <input
              type="text"
              name="headline"
              value={instructor.applicationDetails.headline}
              onChange={(e) => handleNestedChange(e, "headline")}
              className="w-full bg-transparent border-b-2 border-white text-white focus:outline-none"
            />
          ) : (
            instructor.applicationDetails.headline
          )}
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <GraduationCap className="mr-2" /> Education
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <label>
              <strong>Degree:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="degree"
                  value={instructor.applicationDetails.degree}
                  onChange={(e) => handleNestedChange(e, "degree")}
                  className="w-full border border-gray-300 rounded p-1"
                />
              ) : (
                instructor.applicationDetails.degree
              )}
            </label>
            <label>
              <strong>Qualification:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="qualification"
                  value={instructor.applicationDetails.qualification}
                  onChange={(e) => handleNestedChange(e, "qualification")}
                  className="w-full border border-gray-300 rounded p-1"
                />
              ) : (
                instructor.applicationDetails.qualification
              )}
            </label>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <Briefcase className="mr-2" /> Skills
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            {instructor.applicationDetails.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillsChange(e, index)}
                      className="w-full border border-gray-300 rounded p-1"
                    />
                    <button
                      onClick={() => removeSkill(index)}
                      className="text-red-500 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <span>{skill}</span>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={addSkill}
                className="text-blue-500 font-bold hover:underline"
              >
                Add Skill
              </button>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <Award className="mr-2" /> Certifications
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            {instructor.applicationDetails.certifications.map(
              (cert, index) => (
                <div key={index} className="mb-4">
                  <label>
                    <strong>Title:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) =>
                          handleCertificationsChange(index, "title", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    ) : (
                      cert.title
                    )}
                  </label>
                  <label>
                    <strong>Issuer:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) =>
                          handleCertificationsChange(index, "issuer", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    ) : (
                      cert.issuer
                    )}
                  </label>
                  <label>
                    <strong>Date:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="date"
                        value={cert.date}
                        onChange={(e) =>
                          handleCertificationsChange(index, "date", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    ) : (
                      cert.date
                    )}
                  </label>
                  <label>
                    <strong>Certificate URL:</strong>{" "}
                    {isEditing ? (
                      <input
                        type="url"
                        value={cert.certificateUrl}
                        onChange={(e) =>
                          handleCertificationsChange(index, "certificateUrl", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded p-1"
                      />
                    ) : (
                      <a
                        href={cert.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Certificate
                      </a>
                    )}
                  </label>
                  {isEditing && (
                    <button
                      onClick={() => removeCertification(index)}
                      className="text-red-500 font-bold hover:underline mt-2"
                    >
                      Remove Certification
                    </button>
                  )}
                </div>
              )
            )}
            {isEditing && (
              <button
                onClick={addCertification}
                className="text-blue-500 font-bold hover:underline"
              >
                Add Certification
              </button>
            )}
          </div>
        </section>

        {isEditing ? (
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default EditApplication;
