import React from 'react';
import { Eye, Download, CheckCircle, XCircle } from 'lucide-react';

const ViewApplication = () => {
  const application = {
    headline: "Experienced Software Developer",
    skills: ["JavaScript", "React", "Node.js", "CSS"],
    degree: "Bachelor of Computer Science",
    qualification: "Certified Full-Stack Developer",
    experience:
      "Over 5 years of experience developing scalable web applications and APIs using MERN stack.",
    resume: new File(["Dummy Resume Content"], "resume.pdf", {
      type: "application/pdf",
    }),
    certifications: [
      {
        title: "Full-Stack Web Development",
        issuer: "Coursera",
        date: "2023-01-15",
        file: new File(["Dummy Certificate Content"], "certificate.jpg", {
          type: "image/jpeg",
        }),
      },
      {
        title: "Advanced JavaScript",
        issuer: "Udemy",
        date: "2022-12-01",
        file: null,
      },
    ],
  };

  const onApprove = () => alert("Application Approved!");
  const onReject = () => alert("Application Rejected!");

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h1 className="text-3xl font-bold">Instructor Application Review</h1>
      </div>
      <div className="p-6 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Headline</h3>
              <p className="mt-1 text-gray-600">{application.headline}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Degree</h3>
              <p className="mt-1 text-gray-600">{application.degree}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Qualification</h3>
              <p className="mt-1 text-gray-600">{application.qualification}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {application.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <p className="text-gray-600 whitespace-pre-wrap">{application.experience}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Resume</h2>
          {application.resume ? (
            <div className="flex items-center space-x-4">
              <a
                href={URL.createObjectURL(application.resume)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                <Eye className="mr-2" size={18} />
                View Resume
              </a>
              <a
                href={URL.createObjectURL(application.resume)}
                download={application.resume.name}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              >
                <Download className="mr-2" size={18} />
                Download Resume
              </a>
            </div>
          ) : (
            <p className="text-gray-600">No resume provided</p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
          {application.certifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {application.certifications.map((cert, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-700">{cert.title}</h3>
                  <p className="text-gray-600">Issuer: {cert.issuer}</p>
                  <p className="text-gray-600">Date: {cert.date}</p>
                  {cert.file && (
                    <div className="mt-2">
                      {cert.file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(cert.file)}
                          alt={`Certificate for ${cert.title}`}
                          className="max-w-full h-auto rounded-lg shadow-sm"
                        />
                      ) : (
                        <div className="flex items-center space-x-4 mt-2">
                          <a
                            href={URL.createObjectURL(cert.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition duration-300"
                          >
                            <Eye className="mr-1" size={14} />
                            View
                          </a>
                          <a
                            href={URL.createObjectURL(cert.file)}
                            download={cert.file.name}
                            className="flex items-center px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition duration-300"
                          >
                            <Download className="mr-1" size={14} />
                            Download
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No certifications provided</p>
          )}
        </section>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={onReject}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 flex items-center"
          >
            <XCircle className="mr-2" size={18} />
            Reject Application
          </button>
          <button
            onClick={onApprove}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 flex items-center"
          >
            <CheckCircle className="mr-2" size={18} />
            Approve Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewApplication;
