import { Card, Button } from "@nextui-org/react";
import Footer from "../../generalParts/landipage/footer";
import ImageCard from "../../generalParts/landipage/Card";
import CardFooter from "../../generalParts/landipage/Cardfooter";
import ScrollLeftButton from "../../generalParts/landipage/ScrollLeft";
import ScrollRightButton from "../../generalParts/landipage/ScrollRight";
import Navbar from "../../generalParts/landipage/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { adminApi } from "../../axios/axiosInstance";
import { fetchAllCourse } from "../../features/api/fetchAllcourse";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const scrollref = useRef(null);
  const [categories, setCategories] = useState();
  const [filteredCourses, setFilteredCourses] = useState(null);
  const [course, setCourse] = useState();
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollref.current) {
      const currentPos = scrollref.current.scrollLeft;
      const newPos = direction == "right" ? currentPos + 300 : currentPos - 300;
      scrollref.current.scrollTo({ left: newPos, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const categoriesStored = await adminApi.get("/getCategories");

      const category = categoriesStored.data.data.map((category) => ({
        ...category,
        value: category.name,
      }));

      setCategories(category);
      console.log(category, "category");

      return category;
    };
    fetchCategory();
  }, []);
  //filter the course by category
  const filterCourseByCategory = (id) => {
    console.log(id);

    if (filteredCourses && filteredCourses[0]?.category == id) {
      console.log("else part need to be worked");
      setFilteredCourses(null);
    } else {
      const filtered = course.filter((c) => c.category?._id == id);
      console.log(filtered, "course");
      setFilteredCourses(filtered);
    }
  };
  //fetch all the courses
  useEffect(() => {
    const fetchData = async () => {
      const courses = await fetchAllCourse();
      console.log(courses);
      const updatedCourses = await courses.filter(
        (crs) => crs.isPublished == true
      );
      console.log(updatedCourses, "updatedCourse");
      setCourse(updatedCourses);
    };
    fetchData();
  }, []);

  const courseDetail = (courseDetail) => {
    navigate("/courseDetail", { state: { course: courseDetail } });
  };

  return (
    <>
      {course && (
        <div className="min-h-screen bg-white">
          <Navbar />
          <section className="w-full py-12 px-4">
            <div className="max-w-7xl mx-auto relative ">
              <img
                src="https://img-c.udemycdn.com/notices/web_carousel_slide/image/db24b94e-d190-4d5a-b1dd-958f702cc8f5.jpg"
                className="object-cover "
                alt=""
              />
              <div className="absolute top-1/2  transform -translate-y-1/2 p-3 sm:p-5 md:p-8 sm:w-2/5 md:w-3/4 lg:w-1/2 xl:w-2/5 w-2/5">
                <motion.div
                  initial={{ x: -500, scale: 0.5, background: "bg-red-500" }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="w-full border p-3 xl:p-14 md:p-9 sm:p-5 bg-slate-50"
                >
                  <h1 className=" font-poppins text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-3xl ">
                    {" "}
                    Learning that gets you{" "}
                  </h1>
                  <motion.p
                    animate={{
                      color: [
                        "#f43f5e",
                        "#f59e0b",
                        "#10b981",
                        "#3b82f6",
                        "#f43f5e",
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    className="text-sm xl:text-lg"
                  >
                    Skills for your present (and your future). Get started with
                    us.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-4">
                All The Skill You Need In One Place
              </h1>
              <p className="text-gray-600 mb-8">
                From critical skills to technical topics, V ingle supports your
                professional development
              </p>

              <div className="flex flex-wrap gap-10 mb-8">
              {categories.map((category, index) => (
  <motion.button
    key={category._id}
    variant="flat"
    className="bg-gray-200 hover:bg-gray-300 rounded-md p-3 shadow-md shadow-slate-300"
    onClick={() => filterCourseByCategory(category._id)}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
  >
    {category.value}
  </motion.button>
))}

              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Featured Courses</h2>
              <Button variant="light">See all</Button>
            </div>

            <div className="relative">
              <div
                className="flex gap-4 pb-4 overflow-x-hidden"
                ref={scrollref}
              >
                {(filteredCourses || course).map((courseData, i) => (
                  <Card key={i} className="min-w-[300px]">
                    <ImageCard ImageLink={courseData} navigate={courseDetail} />
                    <CardFooter courseData={courseData} />
                  </Card>
                ))}
              </div>

              <ScrollLeftButton onClick={() => scroll("left")} />
              <ScrollRightButton onClick={() => scroll("right")} />
            </div>
          </section>

          {/* <section className="max-w-7xl mx-auto px-4 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Best Seller</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <ImageCard ImageLink={courseData.thumbnail} />
                <CardFooter courseData={courseData}></CardFooter>
              </Card>
            ))}
          </div>
        </section> */}

          <section className="max-w-7xl mx-auto px-4 mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Learn English With Our AI
            </h2>
            <p className="text-gray-600 mb-8">
              Learn English from From our custom AI Module in an Interactive way
            </p>
          </section>

          <section className="bg-gray-200 py-20 mb-12 max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-lg">1k+ users</div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    Join Now 2000 Free Credit
                  </h2>
                  <Button color="warning" size="lg">
                    CLICK HERE TO JOIN
                  </Button>
                </div>
                <div className="text-lg">PTE TEST PREPARATION</div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      )}
    </>
  );
}
