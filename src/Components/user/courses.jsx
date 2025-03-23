import Navbar from "../../generalParts/landipage/Navbar";
import Welcome from "../../generalParts/courses/welcome";
import Slider from "../../generalParts/courses/slider";
import { allUserOrders } from "../../features/api/isOrderPlaced";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["5vh", "100vh"]);

  return (
    <>  
      <Navbar />
      
      
      <div className="flex flex-col w-full px-4 sm:px-6 md:px-8 lg:px-36 border">
     
        <div className="p-4 sm:p-8 md:p-16 flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="w-full md:w-auto">
            <Welcome />
          </div>
          <div className="w-full md:w-60">
            <ViewMyCourse />
          </div>
        </div>
    
        <div className="p-3 font-bold">
          <p className="font-inter text-lg sm:text-xl md:text-2xl">What to Learn Next</p>
        </div>
        <div className="w-full">
          <Slider />
        </div>
      </div>
    </>
  );
}

function ViewMyCourse() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full items-center">
        <motion.button
          className="w-full h-10 border bg-yellow-400 text-black rounded-md shadow-md text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/profile/course")}
        >
          View My Course
        </motion.button>
      </div>
    </>
  );
}