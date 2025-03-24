import React from "react";
import { Eye, Download, CheckCircle, XCircle } from "lucide-react";
import { adminApi } from "../../axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import RejectionModal from "../modals/rejectionModal";

const ViewApplication = ({ application }) => {
  const navigate = useNavigate();

  if (!application) {
    return <div>Loading..</div>;
  }

  console.log(application);

  const onApprove = async () => {
    console.log(application);
    const response = await adminApi.put("/approveApplication", { application });
    console.log(response.data.approve);
    if (response) {
      navigate("/admin/tutors");
    }
  };

  const onReject = async (rejectionReasons) => {
    console.log("called");
    const response = await adminApi.put("/rejectApplication", {
      application,
      rejectionReasons,
    });
    console.log(response.data.data);
    if (response) {
      navigate("/admin/tutors");
    }
  };

  return (

    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden  w-full h-full p-6">
      <p className="text-4xl mx-6"> Application Details</p>
      <div className="p-6 space-y-6">
        <section >
          <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" flex gap-48"> 
            <div>
              <h3 className="text-lg font-medium text-gray-700">Headline</h3>
              <p className="mt-1 text-gray-600">{application.headline}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Degree</h3>
              <p className="mt-1 text-gray-600">{application.degree}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Qualification
              </h3>
              <p className="mt-1 text-gray-600">{application.qualification}</p>
            </div>
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

        <div className=" flex gap-40">
          <section>
            <h2 className="text-2xl font-semibold mb-4 w-1/2 ">Experience</h2>
            <p className="text-gray-600 whitespace-pre-wrap">
              {application.experience}
            </p>
          </section>

          <section className="flex flex-col w-1/2">
            <h2 className=" block text-2xl  font-semibold mb-4">Resume</h2>
            {application.resume ? (
              <div className="flex items-center space-x-4">
                <a
                  href={application.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-yellow-400 text-black rounded hover:bg-blue-600 transition duration-300"
                >
                  <Eye className="mr-2" size={18} />
                  View Resume
                </a>
                <a
                  href={application.resume}
                  download={application.resume.name}
                  className="flex items-center  bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300"
                >
                  <Download className="mr-2" size={18} />
                  Download Resume
                </a>
              </div>
            ) : (
              <p className="text-gray-600">No resume provided</p>
            )}
          </section>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
          {application.certifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {application.certifications.map((cert, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-700">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600">Issuer: {cert.issuer}</p>
                  <p className="text-gray-600">Date: {cert.date}</p>
                  {cert.certificateUrl && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-4 mt-2">
                        <a
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-blue-600 transition duration-300"
                        >
                          <Eye className="mr-1" size={14} />
                          View
                        </a>
                        <a
                          href={cert.certificateUrl}
                          download={"download"}
                          className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition duration-300"
                        >
                          <Download className="mr-1" size={14} />
                          Download
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No certifications provided</p>
          )}
        </section>
        {application.status == "pending" && (   

        <div className="flex justify-end space-x-4 mt-8">
          <RejectionModal onReject={onReject}> </RejectionModal>

          <button
            onClick={() => onApprove()}
            className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300 flex items-center"
          >
            <CheckCircle className="mr-2" size={18} />
            Approve Application
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplication;
