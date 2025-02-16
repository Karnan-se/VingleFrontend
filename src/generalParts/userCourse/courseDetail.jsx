"use client";

import { useState } from "react";
import {
  ChevronDown,
  Star,
  PlayCircle,

} from "lucide-react";
import { useLocation } from "react-router-dom";
import WhatWillYouLearn from "./WhatwillYouLearn";
import ThisCourse from "./ThisCourse";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { confirmPayment } from "../../features/api/confirmPayment";
import { isOrderCompleated } from "../../features/api/isOrderPlaced";

export default function CourseDetail({ userInfo }) {
  const [openSections, setOpenSections] = useState([]);
  const [isOrdered, setOrdered] = useState();
  const location = useLocation();
  const navigate = useNavigate();




  const { course } = location.state || {};

  useEffect(() => {
    if (!course) {
      console.warn("No course data found.");
      navigate("/");
    }
  }, [course, navigate]);

  const toggleSection = (sectionId) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  useEffect(() => {
    async function fetchOrderDetails() {
      const orders = await isOrderCompleated(course._id, userInfo._id);
      console.log(orders, "hello orders");
      if (orders) {
        setOrdered(orders);
      }
    }
    fetchOrderDetails();
  }, []);

  const buyCourse = async (course) => {
    console.log("goinf to load stripe Page");

    try {
      const paymentDetail = await confirmPayment(
        course.price,
        course.name,
        course.thumbnail,
        userInfo,
        course
      );
      if (paymentDetail) {
        console.log(paymentDetail);
        window.location.href = paymentDetail.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!course || !userInfo) {
    return null;
  }

  const startLearning =()=>navigate("/StartLearning",{state:{course}})

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-black text-white p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
            <p className="mb-4">{course.description}</p>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-400 text-black px-2 py-1 rounded">
                {course.averageRating}
              </span>

               {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < course.averageRating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
            </div>
            <p className="mt-2">Created by: {course.tutorId.firstName}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WhatWillYouLearn course={course} />

            <ThisCourse course={course} />

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Course Content</h2>
              <div className="border rounded-lg divide-y">
                {course.sections.map((section) => (
                  <div key={section._id} className="bg-white">
                    <button
                      onClick={() => toggleSection(section._id)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                    >
                      <span className="font-medium">{section.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          openSections.includes(section._id)
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    {openSections.includes(section._id) && (
                      <div className="px-4 py-2 bg-gray-50">
                        {section.items.map((item) => (
                          <div
                            key={item._id}
                            className="py-2 flex items-start gap-3"
                          >
                            <PlayCircle className="w-5 h-5 mt-1" />
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                              {item.duration && (
                                <span className="text-sm text-gray-500">
                                  {item.duration} min
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Just a laptop with good Internet</li>
                <li>A strong will to complete the course</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-16">
              <div className=" w-full  h-52">
                <img
                  src={course.thumbnail}
                  alt=""
                  className=" w-full h-52  object-contain"
                />
              </div>
              <div className="text-3xl font-bold mb-4">₹{course.price}</div>
              {!isOrdered ? (
                <button
                  className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded mb-4 hover:bg-yellow-500"
                  onClick={() => buyCourse(course)}
                >
                  Buy Now
                </button>
              ) : (
                <>
                  <button className="w-full bg-red-500 text-black font-bold py-3 px-4 rounded mb-4 hover:bg-red-800 hover:text-white"
                  onClick={()=>startLearning()}>
                    Start Learning
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <CoursePurchaseModal course={course}  isOpen={isMOdalOpen} onClose={()=>setModalOpen(false)} onPurchase={handlePurchase}  /> */}
      </div>
    </>
  );
}
