import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spacer,

  
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { courseRatings } from "../../features/api/ratings";
import { individualRatings } from "../../features/api/ratings";
import { forwardRef } from "react";

import { Star } from "lucide-react";

const RatingsModal = forwardRef(({ isOpen, size, onClose, course }, ref) => {
  const [courseData, setCourseData] = useState([]);
  const [individualRating, setIndividualRatings] = useState([]);

  const ratingLevels = [5, 4, 3, 2, 1];

  const ratingColors = {
    5: "fill-yellow-400 text-yellow-400 " ,
    4: "fill-green-400 text-green-400",
    3: "fill-blue-400 text-blue-400",
    2: "fill-orange-400 text-orange-400",
    1: "fill-red-400 text-red-400",
  };

  useEffect(() => {
    if (isOpen) {
      fetchCourseData(course._id);
      fetchIndividualRatings(course._id);
    }
  }, [isOpen]);

  const fetchCourseData = async (courseId) => {
    try {
      const response = await courseRatings(courseId);
      setCourseData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIndividualRatings = async (courseId) => {
    try {
      const response = await individualRatings(courseId);
      setIndividualRatings(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} size={size} onClose={onClose} backdrop="blur"  ref={ref}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 bg-white">
              View Rating
            </ModalHeader>
            <ModalBody className="bg-white">
              <section className="flex w-full min-h-[300px]">
                {/* Ratings Breakdown */}
                <div className="flex flex-col w-1/3 gap-2">
                  {ratingLevels.map((ratingValue, i) => {
                    const matchedRating =
                      individualRating[0]?.ratingsBreakdown.find(
                        (r) => r.ratingValue === ratingValue
                      );
                    const percentage = matchedRating?.percentage || 0;

                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-yellow-100 p-1 rounded"
                      >
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < ratingValue
                                ? ratingColors[ratingValue]
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                        <p className="text-sm text-gray-800">{percentage}%</p>
                      </div>
                    );
                  })}
                </div>

                {/* Individual Reviews */}
                <div className="flex-1 overflow-y-auto max-h-[300px]">
                  {courseData.length > 0 && (
                    <div className="space-y-4 px-2">
                      {courseData.map((course, idx) => (
                        <section key={idx} className="bg-slate-100 p-3 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <img
                              src={
                                course?.User?.photo ||
                                "https://lh3.googleusercontent.com/a/ACg8ocL6r0gq-hGsQyY_UWkF4nzNFTvUxmhb-nnIvdV5e12GUYLHKA=s96-c"
                              }
                              alt="Profile"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <p className="text-lg font-semibold text-black">
                              {course?.User?.firstName || "User"}
                            </p>
                          </div>

                          <div className="px-1 text-gray-700">
                            <p>{course.review}</p>
                          </div>

                          <div className="flex gap-1 mt-2">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`w-4 h-4 ${
                                  j < course.ratingValue
                                    ? ratingColors[course.ratingValue] 
                                    : "fill-gray-300 text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </ModalBody>
            <ModalFooter className="bg-white">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
})
export default RatingsModal
